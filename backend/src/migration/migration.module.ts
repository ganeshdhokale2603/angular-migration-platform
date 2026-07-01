import { Module } from '@nestjs/common';
import { MigrationController } from './controller/migration.controller';
import { MigrationService } from './service/migration.service';
import { ProjectAnalyzerService } from './project-analyzer/project-analyzer.service';
import { GitModule } from '../git/git.module';
import { ScannerService } from '../scanner/scanner.service';
import { GitService } from '../git/git.service';

@Module({
  imports: [GitModule],
  controllers: [MigrationController],
  providers: [MigrationService, ProjectAnalyzerService, ScannerService, GitService]
})
export class MigrationModule {}
