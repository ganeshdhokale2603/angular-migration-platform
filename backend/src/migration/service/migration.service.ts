import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { MigrationRequestDto } from '../dto/migration-request.dto';
import { ProjectAnalyzerService } from '../project-analyzer/project-analyzer.service';

import { GitService } from 'src/git/git.service';
import { ScannerService } from 'src/scanner/scanner.service';
import { MigrationPlannerService } from 'src/planner/migration-planner.service';
import { RuleEngineService } from 'src/scanner/rules/rule-engine.service';
import { MigrationExecutorService } from 'src/executor/migration-executor.service';
import { PackageUpgradeService } from 'src/package-upgrade/package-upgrade.service';
import { UpgradeEngineService } from 'src/upgrade-engine/upgrade-engine.service';
import { CheckpointService } from 'src/checkpoint/checkpoint.service';
import { CodeMigrationService } from '../../code-migration/code-migration.service';

@Injectable()
export class MigrationService {

  constructor(
    private readonly gitService: GitService,
    private readonly analyzer: ProjectAnalyzerService,
    private readonly scanner: ScannerService,
    private readonly ruleEngine: RuleEngineService,
    private readonly planner: MigrationPlannerService,
    private readonly executor: MigrationExecutorService,
    private readonly packageUpgrade: PackageUpgradeService,
    private readonly upgradeEngine: UpgradeEngineService,
    private readonly checkpointService: CheckpointService,
    private readonly codeMigration: CodeMigrationService
  ) {}

  async startMigration(request: MigrationRequestDto) {

    /**
     * Clone Repository
     */
    const cloned = await this.gitService.cloneRepository(
      request.repositoryUrl,
    );

    /**
     * Read Checkpoint
     */
    const checkpoint = await this.checkpointService.getCheckpoint(
      cloned.path,
    );

    if (checkpoint) {
      console.log('Previous checkpoint found');
      console.table(checkpoint);
    }

    /**
     * Analyze Project
     */
    const projectInfo = await this.analyzer.analyze(cloned.path);

    if (!projectInfo.isAngularProject) {
      throw new Error('Repository is not an Angular project.');
    }

    /**
     * Resume from checkpoint if available
     */

    const angularVersion = projectInfo.angularVersion ?? '0';

    let currentVersion = parseInt(
      angularVersion.match(/\d+/)?.[0] ?? '0',
      10
    );
    
  const targetVersion = Number(request.toVersion);

    console.log('Detected Angular Version:', projectInfo.angularVersion);
    console.log('Parsed Angular Version:', currentVersion);
    console.log('Target Version:', request.toVersion);

    if (checkpoint) {
      currentVersion = checkpoint.completedVersion;
    }

    /**
     * Generate Upgrade Plan
     */
    const upgradePlan = this.upgradeEngine.generateUpgradePlan(
      currentVersion,
      targetVersion,
    );

    console.log('Generated Upgrade Plan');
    console.table(upgradePlan);

    /**
     * Scan Project
     */
    const scan = await this.scanner.scan(cloned.path);

    /**
     * Evaluate Rules
     */
    const issues = this.ruleEngine.evaluate({
      projectInfo,
      statistics: scan.statistics,
      files: scan.files,
      dependencyGraph: scan.dependencyGraph,
    });

    const scanResult = {
      ...scan,
      issues,
    };

    /**
     * Create Migration Plan
     */
    const plan = this.planner.createPlan(scanResult);

    /**
     * Update package.json for each Angular version
     */
    for (const step of upgradePlan) {

      console.log(
        `Preparing Angular ${step.fromVersion} -> ${step.toVersion}`,
      );

      await this.packageUpgrade.upgrade(
        cloned.path,
        step.toVersion.toString(),
      );

      await this.checkpointService.saveCheckpoint(
        cloned.path,
        {
          completedVersion: step.toVersion,
          status: 'SUCCESS',
          completedAt: new Date(),
        },
      );
    }

    /**
     * Execute Upgrade Plan
     */
    const execution = await this.executor.executeUpgradePlan(
      cloned.path,
      upgradePlan,
    );

    const codeMigration = await this.codeMigration.migrate(
      cloned.path
    );

    /**
     * Remove checkpoint after success
     */
    if (execution.status === 'SUCCESS') {
      await this.checkpointService.clearCheckpoint(
        cloned.path,
      );
    }

    /**
     * Return Response
     */
    return {

      jobId: uuid(),

      status: execution.status,

      repository: cloned.path,

      message: 'Angular migration completed successfully.',

      projectInfo,

      scan: scanResult,

      plan,

      upgradePlan,

      execution,

       codeMigration,

      checkpoint:
        await this.checkpointService.getCheckpoint(
          cloned.path,
        ),

    };

  }

}