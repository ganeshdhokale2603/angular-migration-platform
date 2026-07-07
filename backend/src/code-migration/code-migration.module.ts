import { Module } from '@nestjs/common';
import { CodeMigrationService } from './code-migration.service';
import { AstParserModule } from './parser/ast-parser.module';
import { ReportModule } from '../report/report.module';
import { StandaloneModule } from '../standalone/standalone.module';
import { ImportResolverModule } from '../import-resolver/import-resolver.module';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { RouteMigrationModule } from '../route-migration/route-migration.module';
import { ValidatorModule } from '../validator/validator.module';
import { PrGeneratorModule } from '../pr-generator/pr-generator.module';

@Module({
  imports: [
    AstParserModule,
    ReportModule,
    ImportResolverModule,
    StandaloneModule,
    BootstrapModule,
    RouteMigrationModule,
    ValidatorModule,
    PrGeneratorModule,
  ],

  providers: [CodeMigrationService],

  exports: [CodeMigrationService],
})
export class CodeMigrationModule {}
