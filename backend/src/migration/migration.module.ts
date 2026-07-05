import { Module } from '@nestjs/common';
import { MigrationController } from './controller/migration.controller';
import { MigrationService } from './service/migration.service';
import { ProjectAnalyzerService } from './project-analyzer/project-analyzer.service';
import { GitModule } from '../git/git.module';
import { ScannerModule } from '../scanner/scanner.module';
import { PlannerModule } from '../planner/planner.module';
import { ExecutorModule } from '../executor/executor.module';
import { PackageUpgradeModule } from 'src/package-upgrade/package-upgrade.module';
import { CommandExecutorModule } from 'src/command-executor/command-executor.module';
import { RuleEngineService } from 'src/scanner/rules/rule-engine.service';
import { ScannerService } from 'src/scanner/scanner.service';
import { CheckpointModule } from 'src/checkpoint/checkpoint.module';
import { UpgradeEngineModule } from 'src/upgrade-engine/upgrade-engine.module';

@Module({
  imports: [
    GitModule,
    ScannerModule,
    PlannerModule,
    ExecutorModule,
    PackageUpgradeModule,
    CommandExecutorModule,
     UpgradeEngineModule,

    CheckpointModule
  ],
  controllers: [MigrationController],
  providers: [
    MigrationService,
    ProjectAnalyzerService,
    ScannerService,
    RuleEngineService,
  ],
})
export class MigrationModule {}
