import { Module } from '@nestjs/common';
import { MigrationController } from './controller/migration.controller';
import { MigrationService } from './service/migration.service';
import { ProjectAnalyzerService } from './project-analyzer/project-analyzer.service';
import { GitModule } from '../git/git.module';
import { ScannerModule } from '../scanner/scanner.module';

@Module({
  imports: [GitModule,ScannerModule],
  controllers: [MigrationController],
  providers: [MigrationService, ProjectAnalyzerService],
})
export class MigrationModule {}
