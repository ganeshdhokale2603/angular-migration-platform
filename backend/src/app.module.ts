import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migration/migration.module';
import { GitModule } from './git/git.module';
import { PackageUpgradeModule } from './package-upgrade/package-upgrade.module';
import { CommandExecutorModule } from './command-executor/command-executor.module';
import { UpgradeEngineModule } from './upgrade-engine/upgrade-engine.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { CodeMigrationModule } from './code-migration/code-migration.module';
import { AstParserModule } from './code-migration/parser/ast-parser.module';
import { ReportModule } from './report/report.module';
import { StandaloneModule } from './standalone/standalone.module';
import { ImportResolverModule } from './import-resolver/import-resolver.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { RouteMigrationModule } from './route-migration/route-migration.module';
import { ValidatorModule } from './validator/validator.module';
import { PrGeneratorModule } from './pr-generator/pr-generator.module';
import { TemplateMigrationModule } from './template-migration/template-migration.module';
import { TemplateValidatorModule } from './template-validator/template-validator.module';
import { SignalDetectorModule } from './signal-detector/signal-detector.module';
import { ControlFlowModule } from './control-flow/control-flow.module';
import { RxjsModernizationModule } from './rxjs-modernization/rxjs-modernization.module';
import { MaterialMigrationModule } from './material-migration/material-migration.module';
import { MigrationDashboardModule } from './migration-dashboard/migration-dashboard.module';
import { DependencyInjectionModule } from './dependency-injection/dependency-injection.module';
import { LazyLoadingModule } from './lazy-loading/lazy-loading.module';
import { RouteOptimizerModule } from './route-optimizer/route-optimizer.module';
import { DeadRouteModule } from './dead-route/dead-route.module';
import { CircularRouteModule } from './circular-route/circular-route.module';
import { RoutingReportModule } from './routing-report/routing-report.module';
import { ChangeDetectionModule } from './change-detection/change-detection.module';
import { SignalOptimizerModule } from './signal-optimizer/signal-optimizer.module';
import { DeadCodeModule } from './dead-code/dead-code.module';
import { BundleAnalyzerModule } from './bundle-analyzer/bundle-analyzer.module';
import { PerformanceDashboardModule } from './performance-dashboard/performance-dashboard.module';
import { AIAdvisorModule } from './ai-advisor/ai-advisor.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MonorepoModule } from './monorepo/monorepo.module';
import { RollbackModule } from './rollback/rollback.module';

@Module({
  imports: [
    MigrationModule,
    GitModule,
    PackageUpgradeModule,
    CommandExecutorModule,
    UpgradeEngineModule,
    CheckpointModule,
    CodeMigrationModule,
    AstParserModule,
    ReportModule,
    StandaloneModule,
    ImportResolverModule,
    BootstrapModule,
    RouteMigrationModule,
    ValidatorModule,
    PrGeneratorModule,
    TemplateMigrationModule,
    TemplateValidatorModule,
    SignalDetectorModule,
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
    SignalOptimizerModule,
    DeadCodeModule,
    BundleAnalyzerModule,
    PerformanceDashboardModule,
    AIAdvisorModule,
    DashboardModule,
    MonorepoModule,
    RollbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
