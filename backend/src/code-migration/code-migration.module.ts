import { Module } from '@nestjs/common';
import { CodeMigrationService } from './code-migration.service';
import { AstParserModule } from './parser/ast-parser.module';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [AstParserModule, ReportModule],

  providers: [CodeMigrationService],

  exports: [CodeMigrationService],
})
export class CodeMigrationModule {}
