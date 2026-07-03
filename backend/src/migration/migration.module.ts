import { Module } from '@nestjs/common';
import { MigrationController } from './controller/migration.controller';
import { MigrationService } from './service/migration.service';
import { ProjectAnalyzerService } from './project-analyzer/project-analyzer.service';
import { GitModule } from '../git/git.module';
import { ScannerModule } from '../scanner/scanner.module';
import { PlannerModule } from '../planner/planner.module';
import { ExecutorModule } from '../executor/executor.module';
import { PackageUpgradeModule } from 'src/package-upgrade/package-upgrade.module';

@Module({
  imports: [GitModule, ScannerModule, PlannerModule, ExecutorModule, PackageUpgradeModule],
  controllers: [MigrationController],
  providers: [MigrationService, ProjectAnalyzerService],
})
export class MigrationModule {}
