import { Module } from '@nestjs/common';
import { TemplateMigrationService } from './template-migration.service';
import { HtmlParserService } from './html-parser.service';

@Module({
  providers: [TemplateMigrationService, HtmlParserService],

  exports: [TemplateMigrationService],
})
export class TemplateMigrationModule {}
