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


@Injectable()
export class MigrationService {
  constructor(
    private readonly gitService: GitService,

    private readonly analyzer: ProjectAnalyzerService,
    private readonly scanner: ScannerService,
    private readonly ruleEngine: RuleEngineService,
    private readonly planner: MigrationPlannerService,
    private readonly executor: MigrationExecutorService,
    private readonly packageUpgrade: PackageUpgradeService
  ) {}

  async startMigration(request: MigrationRequestDto) {
    const cloned = await this.gitService.cloneRepository(request.repositoryUrl);

    const projectInfo = await this.analyzer.analyze(cloned.path);

    // Scan project structure
    const scan = await this.scanner.scan(cloned.path);

    const issues = this.ruleEngine.evaluate({
      projectInfo,
      statistics: scan.statistics,
      files: scan.files,
      dependencyGraph: scan.dependencyGraph
    });

    const scanResult = {
      ...scan,
      issues
    };

    const plan = this.planner.createPlan(scanResult);

    const execution = await this.executor.execute(plan);

    const packageUpgrade = await this.packageUpgrade.upgrade(
      cloned.path, request.toVersion.toString()
    );

    if (!projectInfo.isAngularProject) {
      throw new Error('Repository is not an Angular project.');
    }

    return {
      jobId: uuid(),
      status:'SUCCESS',
      repository: cloned.path,
      message: 'Angular project scanned successfully.',
      projectInfo,
      scan: scanResult,
      plan,
      execution,
      packageUpgrade
    };
  }
}
