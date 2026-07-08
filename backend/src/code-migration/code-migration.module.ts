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
import { TemplateMigrationModule } from '../template-migration/template-migration.module';
import { TemplateValidatorModule } from '../template-validator/template-validator.module';
import { ControlFlowModule } from '../control-flow/control-flow.module';
import { RxjsModernizationModule } from '../rxjs-modernization/rxjs-modernization.module';
import { MaterialMigrationModule } from '../material-migration/material-migration.module';
import { MigrationDashboardModule } from '../migration-dashboard/migration-dashboard.module';
import { DependencyInjectionModule } from '../dependency-injection/dependency-injection.module';
import { LazyLoadingModule } from '../lazy-loading/lazy-loading.module';
import { RouteOptimizerModule } from '../route-optimizer/route-optimizer.module';
import { DeadRouteModule } from '../dead-route/dead-route.module';
import { CircularRouteModule } from '../circular-route/circular-route.module';
import { RoutingReportModule } from '../routing-report/routing-report.module';
import { ChangeDetectionModule } from 'src/change-detection/change-detection.module';

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
    TemplateMigrationModule,
    TemplateValidatorModule,
    ControlFlowModule,
    RxjsModernizationModule,
    MaterialMigrationModule,
    MigrationDashboardModule,
    DependencyInjectionModule,
    LazyLoadingModule,
    RouteOptimizerModule,
    DeadRouteModule,
    CircularRouteModule,
    RoutingReportModule,
    ChangeDetectionModule,
  ],

  providers: [CodeMigrationService],

  exports: [CodeMigrationService],
})
export class CodeMigrationModule {}
