import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as ts from 'typescript';

import { AstParserService } from './parser/ast-parser.service';
import { ComponentTransformer } from './transformers/component.transformer';
import { ModuleTransformer } from './transformers/module.transformer';
import { ProviderTransformer } from './transformers/provider.transformer';
import { ReportService } from 'src/report/report.service';
import { StandaloneService } from '../standalone/standalone.service';
import { ImportResolverService } from '../import-resolver/import-resolver.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import { BootstrapService } from '../bootstrap/bootstrap.service';
import { RouteMigrationService } from '../route-migration/route-migration.service';
import { ValidatorService } from '../validator/validator.service';
import { PrGeneratorService } from '../pr-generator/pr-generator.service';
import { TemplateMigrationService } from '../template-migration/template-migration.service';
import { TemplateValidatorService } from '../template-validator/template-validator.service';
import { MigrationReport } from 'src/report/models/migration-report';
import { ControlFlowService } from 'src/control-flow/control-flow.service';
import { RxjsModernizationService } from 'src/rxjs-modernization/rxjs-modernization.service';
import { MaterialMigrationService } from '../material-migration/material-migration.service';
import { MigrationDashboardService } from '../migration-dashboard/migration-dashboard.service';
import { MigrationDashboard } from '../migration-dashboard/dashboard.model';
import { DependencyInjectionService } from '../dependency-injection/dependency-injection.service';
import { LazyLoadingService } from '../lazy-loading/lazy-loading.service';
import { RouteOptimizerService } from '../route-optimizer/route-optimizer.service';
import { DeadRouteService } from '../dead-route/dead-route.service';
import { CircularRouteService } from '../circular-route/circular-route.service';
import { RoutingReportService } from '../routing-report/routing-report.service';
import { ChangeDetectionService } from 'src/change-detection/change-detection.service';
import { SignalOptimizerService } from 'src/signal-optimizer/signal-optimizer.service';
import { DeadCodeService } from 'src/dead-code/dead-code.service';
import { BundleAnalyzerService } from 'src/bundle-analyzer/bundle-analyzer.service';
import { PerformanceDashboardService } from '../performance-dashboard/performance-dashboard.service';
import { MaterialScannerService } from '../material-migration/material-scanner.service';
import { MaterialValidatorService } from '../material-migration/material-validator.service';
import { RxjsMigrationService } from '../rxjs-migration/rxjs-migration.service';
import { RxjsValidatorService } from '../rxjs-migration/rxjs-validator.service';
import { AIAdvisorService } from '../ai-advisor/ai-advisor.service';
import { RollbackService } from 'src/rollback/rollback.service';

@Injectable()
export class CodeMigrationService {
  constructor(
    private readonly parser: AstParserService,
    private readonly reportService: ReportService,
    private readonly standalone: StandaloneService,
    private readonly resolver: ImportResolverService,
    private readonly bootstrap: BootstrapService,
    private readonly routeMigration: RouteMigrationService,
    private readonly validator: ValidatorService,
    private readonly prGenerator: PrGeneratorService,
    private readonly templateMigration: TemplateMigrationService,
    private readonly templateValidator: TemplateValidatorService,
    private readonly controlFlow: ControlFlowService,
    private readonly rxjsModernization: RxjsModernizationService,
    private readonly materialMigration: MaterialMigrationService,
    private readonly dashboardService: MigrationDashboardService,
    private readonly dependencyInjection: DependencyInjectionService,
    private readonly lazyLoading: LazyLoadingService,
    private readonly routeOptimizer: RouteOptimizerService,
    private readonly deadRoute: DeadRouteService,
    private readonly circularRoute: CircularRouteService,
    private readonly routingReport: RoutingReportService,
    private readonly changeDetection: ChangeDetectionService,
    private readonly signalOptimizer: SignalOptimizerService,
    private readonly deadCode: DeadCodeService,
    private readonly bundleAnalyzer: BundleAnalyzerService,
    private readonly performanceDashboard: PerformanceDashboardService,
    private readonly materialScanner: MaterialScannerService,
    private readonly materialValidator: MaterialValidatorService,
    private readonly rxjsMigration: RxjsMigrationService,
    private readonly rxjsValidator: RxjsValidatorService,
    private readonly aiAdvisor: AIAdvisorService,
    private readonly rollbackService: RollbackService
  ) {}

  private readonly componentTransformer = new ComponentTransformer();

  private readonly moduleTransformer = new ModuleTransformer();

  private readonly providerTransformer = new ProviderTransformer();

  /**
   * Scan and migrate all Angular source files
   */
  async migrate(projectPath: string) {

 const checkpoint =
        this.rollbackService.createCheckpoint(
            projectPath,
            'Before Angular Migration'
        );

        try{

        

    let migrated = 0;
    let constructorCount = 0;

    let injectCount = 0;

    let httpProviders = 0;

    let animationProviders = 0;

    let rootProviders = 0;

    let functionalProviders = 0;
    let routerProviders = 0;
    let lazyRoutes = 0;

    let loadComponents = 0;

    let skippedLazyRoutes = 0;
    let duplicateRoutes = 0;

    let duplicateRedirects = 0;

    let normalizedRoutes = 0;

    let optimizedRoutes = 0;

    let deadRoutes = 0;

    let wildcardIssues = 0;

    let duplicatePaths = 0;

    let emptyPathConflicts = 0;

    const routingWarnings: string[] = [];
    let circularDependencies = 0;

    const circularCycles: string[][] = [];

    let totalRoutes = 0;

    let standaloneRoutes = 0;

    const files = await fg(['**/*.ts'], {
      cwd: projectPath,
      absolute: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.spec.ts'],
    });

    const summary = {
      files: files.length,

      components: 0,

      modules: 0,

      services: 0,
    };

    let totalLegacyImports = 0;

    let totalMigratedImports = 0;

    let projectMaterialScan = {
      materialVersion: 'Unknown',
      totalMaterialImports: 0,
      legacyImports: 0,
      mdcImports: 0,
      componentsUsingMaterial: 0,
      materialModules: [] as string[],
    };

    let typographyMigrated = 0;

    let iconsDetected = 0;

    let totalRxjsImports = 0;

    let observableCount = 0;

    let subjectCount = 0;

    let behaviorSubjectCount = 0;

    let replaySubjectCount = 0;

    let asyncSubjectCount = 0;

    let subscriptionCount = 0;

    let deprecatedRxjsOperators = 0;
    let totalSubscriptions = 0;

    let unmanagedSubscriptions = 0;

    let takeUntilUsage = 0;

    let ngOnDestroyComponents = 0;
    let destroySubjects = 0;

let destroyRefDetected = 0;

let takeUntilDestroyedCandidates = 0;

    for (const file of files) {
      //----------------------------------
      // Parse
      //----------------------------------

      let sourceFile = await this.parser.parse(file);

      //----------------------------------
      // AST Transformations
      //----------------------------------

      sourceFile = this.componentTransformer.transform(sourceFile);

      sourceFile = this.moduleTransformer.transform(sourceFile);

      sourceFile = this.providerTransformer.transform(sourceFile);

      const rxjsReport = this.rxjsMigration.scan(sourceFile);

      const subscriptionReport = this.rxjsMigration.analyzeSubscriptions(sourceFile);

      const cleanupReport = this.rxjsMigration.analyzeCleanup(sourceFile);

      //----------------------------------
      // Convert AST → String
      //----------------------------------

      let updatedSource = this.parser.print(sourceFile);
      const originalSource = updatedSource;

      //----------------------------------
      // String Transformations
      //----------------------------------

      updatedSource = this.standalone.migrate(updatedSource);

      updatedSource = this.bootstrap.migrate(updatedSource);

      updatedSource = this.routeMigration.migrate(updatedSource);

      const rxjsResult = this.rxjsMigration.transform(updatedSource);

      updatedSource = rxjsResult.source;

      //----------------------------------
      // Angular Material Migration
      //----------------------------------

      const materialResult = this.materialScanner.migrate(updatedSource);

      updatedSource = materialResult.source;

      const iconResult =
    this.materialMigration.migrateIcons(
        updatedSource
    );

      updatedSource = iconResult.source;

      const materialScan =
        this.materialScanner.scan(
          this.parser.createSourceFile(
            file,
            updatedSource,
          ),
        );

      totalLegacyImports += materialResult.legacyImports;

      totalMigratedImports += materialResult.migratedImports;

      projectMaterialScan.totalMaterialImports +=
        materialScan.totalMaterialImports;

      projectMaterialScan.legacyImports +=
        materialScan.legacyImports;

      projectMaterialScan.mdcImports +=
        materialScan.mdcImports;

      projectMaterialScan.componentsUsingMaterial +=
        materialScan.componentsUsingMaterial;

      projectMaterialScan.materialModules.push(
        ...materialScan.materialModules,
      );

      const routeMatches = updatedSource.match(/path\s*:/g);

      if (routeMatches) {
        totalRoutes += routeMatches.length;
      }

      const lazyMatches = updatedSource.match(/loadChildren|loadComponent/g);

      if (lazyMatches) {
        lazyRoutes += lazyMatches.length;
      }

      const standaloneMatches = updatedSource.match(/standalone\s*:\s*true/g);

      if (standaloneMatches) {
        standaloneRoutes += standaloneMatches.length;
      }

      updatedSource = this.rxjsModernization.migrate(updatedSource);

      updatedSource = this.materialMigration.migrate(updatedSource);

      //----------------------------------
      // Template imports
      //----------------------------------

      const templateImports = await this.resolveTemplateImports(file);

      updatedSource = this.injectImports(updatedSource, templateImports);

      const diResult = this.dependencyInjection.migrate(file, updatedSource);

      updatedSource = diResult.source;

      if (diResult.report.migrated > 0) {
        console.log(`DI migrated: ${file}`);
      }

      const lazyResult = this.lazyLoading.migrate(updatedSource);

      updatedSource = lazyResult.source;

      const optimizationResult = this.routeOptimizer.optimize(updatedSource);

      updatedSource = optimizationResult.source;

      const deadRouteReport = this.deadRoute.analyze(updatedSource);

      const circularReport = this.circularRoute.analyze(updatedSource);

      const onPushResult = this.changeDetection.transform(updatedSource);

      updatedSource = onPushResult.source;

      const signalResult = this.signalOptimizer.optimize(updatedSource);

      updatedSource = signalResult.source;

      //----------------------------------
      // Save
      //----------------------------------

      if (updatedSource !== originalSource) {
        await this.parser.save(file, updatedSource);

        migrated++;

        constructorCount += diResult.report.constructorsFound;

        injectCount += diResult.report.injectCalls;
        httpProviders += diResult.report.providers.httpClient;

        animationProviders += diResult.report.providers.animations;

        rootProviders += diResult.report.providers.rootProviders;

        functionalProviders += diResult.report.providers.functionalProviders;
        routerProviders += diResult.report.providers.router;

        lazyRoutes += lazyResult.report.loadChildrenFound;

        loadComponents += lazyResult.report.loadComponentGenerated;

        skippedLazyRoutes += lazyResult.report.skipped;
        duplicateRoutes += optimizationResult.report.duplicateRoutes;

        duplicateRedirects += optimizationResult.report.duplicateRedirects;

        normalizedRoutes += optimizationResult.report.normalizedRoutes;

        optimizedRoutes += optimizationResult.report.optimizedRoutes;

        deadRoutes += deadRouteReport.deadRoutes;

        wildcardIssues += deadRouteReport.wildcardIssues;

        duplicatePaths += deadRouteReport.duplicatePaths;

        emptyPathConflicts += deadRouteReport.emptyPathConflicts;

        routingWarnings.push(...deadRouteReport.warnings);

        circularDependencies += circularReport.circularDependencies;

        circularCycles.push(...circularReport.cycles);

        iconsDetected += iconResult.legacyIcons;

        totalRxjsImports += rxjsReport.totalRxjsImports;

        observableCount += rxjsReport.observableCount;

        subjectCount += rxjsReport.subjectCount;

        behaviorSubjectCount += rxjsReport.behaviorSubjectCount;

        replaySubjectCount += rxjsReport.replaySubjectCount;

        asyncSubjectCount += rxjsReport.asyncSubjectCount;

        subscriptionCount += rxjsReport.subscriptionCount;

        deprecatedRxjsOperators += rxjsResult.deprecatedOperators;

        totalSubscriptions += subscriptionReport.subscriptions;

        unmanagedSubscriptions += subscriptionReport.unmanagedSubscriptions;

        takeUntilUsage += subscriptionReport.takeUntilUsage;

        if (subscriptionReport.ngOnDestroyImplemented) {
          ngOnDestroyComponents++;
        }

        destroySubjects += cleanupReport.destroySubjects;

        takeUntilDestroyedCandidates += cleanupReport.takeUntilDestroyedCandidates;

        if (cleanupReport.destroyRefDetected) {
              destroyRefDetected++;
        }
        
      }

      //----------------------------------
      // Dead Code Analysis
      //----------------------------------

      this.deadCode.analyze(file, updatedSource);

      //----------------------------------
      // Statistics
      //----------------------------------

      this.inspectSourceFile(
        this.parser.createSourceFile(file, updatedSource),

        summary,
      );
    }

    const rxjsValidation =
      this.rxjsValidator.validate(
        deprecatedRxjsOperators,
        unmanagedSubscriptions,
        destroySubjects
      );

    const scssFiles = await fg(
      ['**/*.scss'],

      {
        cwd: projectPath,

        absolute: true,

        ignore: ['**/node_modules/**', '**/dist/**'],
      },
    );

    let migratedThemes = 0;

    for (const file of scssFiles) {
      const source = await fs.readFile(file, 'utf8');

      const themeResult =
    this.materialMigration.migrateTheme(source);

const typographyResult =
    this.materialMigration.migrateTypography(
        themeResult.source
    );

      

      await fs.writeFile(

          file,

          typographyResult.source

      );

      if (themeResult.migrated) {

          migratedThemes++;

      }

      if (typographyResult.migrated) {

          typographyMigrated++;

      }
    }

    console.log('');

    console.log('Dependency Injection');

    console.log(`Constructors Found : ${constructorCount}`);

    console.log(`inject() Calls : ${injectCount}`);

    console.log(`Router Providers : ${routerProviders}`);

    const validationResults =
      await this.templateValidator.validate(projectPath);

    const totalTemplates = validationResults.length;

    const validTemplates = validationResults.filter((v) => v.valid).length;

    const confidenceScore =
      totalTemplates === 0
        ? 100
        : Math.round((validTemplates / totalTemplates) * 100);

    //----------------------------------
    // Final Result
    //----------------------------------

    const report: MigrationReport = {
      projectName: projectPath.split(/[\\/]/).pop() ?? 'Unknown Project',

      filesScanned: summary.files,

      filesMigrated: migrated,

      components: summary.components,

      modules: summary.modules,

      services: summary.services,

      generatedAt: new Date(),

      validation: undefined,

      templateValidation: validationResults,

      confidenceScore,

      providerOptimization: {
        httpClient: httpProviders,

        animations: animationProviders,

        router: routerProviders,

        rootProviders,

        functionalProviders,
      },
    };

    report.deadCode = this.deadCode.getReport();

    const bundleReport = this.bundleAnalyzer.analyze({
      totalComponents: summary.components,

      standaloneComponents: report.changeDetection?.optimizedComponents ?? 0,

      lazyRoutes: report.routingReport?.lazyRoutes ?? 0,

      totalRoutes: report.routingReport?.totalRoutes ?? 0,

      signalComponents: report.signalOptimization?.signalsCreated ?? 0,

      treeShakingScore: report.deadCode?.treeShakingScore ?? 100,
    });

    report.bundlePerformance = bundleReport;

    const performanceDashboard = this.performanceDashboard.generate({
      bundleScore: bundleReport.performanceScore,

      changeDetectionScore:
        report.changeDetection == null
          ? 100
          : Math.round(
              (report.changeDetection.optimizedComponents /
                Math.max(report.changeDetection.totalComponents, 1)) *
                100,
            ),

      signalScore:
        report.signalOptimization == null
          ? 100
          : Math.round(
              (report.signalOptimization.signalsCreated /
                Math.max(report.signalOptimization.behaviorSubjectsFound, 1)) *
                100,
            ),

      treeShakingScore: report.deadCode?.treeShakingScore ?? 100,

      estimatedBundleSize: bundleReport.estimatedBundleSize,

      estimatedSaving: bundleReport.estimatedSaving,
    });

    report.performanceDashboard = performanceDashboard;

     const materialValidation =
      await this.materialValidator.validate(projectPath);

    report.materialMigration = {
      legacyImports: totalLegacyImports,

      migratedImports: totalMigratedImports,

      themesMigrated: migratedThemes,

      typographyMigrated,

      iconsDetected,
      compatibilityScore: materialValidation.compatibilityScore,
    };

    report.rxjsMigration = {
      totalImports: totalRxjsImports,

      deprecatedOperators: deprecatedRxjsOperators,

      observableCount,

      subjectCount,

      behaviorSubjectCount,

      replaySubjectCount,

      asyncSubjectCount,

      subscriptionCount,
    };

    report.subscriptionAnalysis = {
      totalSubscriptions,

      unmanagedSubscriptions,

      takeUntilUsage,

      ngOnDestroyComponents,

      memoryLeakRisk:
        unmanagedSubscriptions > 5
          ? 'HIGH'
          : unmanagedSubscriptions > 0
            ? 'MEDIUM'
            : 'LOW',
    };

    report.cleanupAnalysis = {

        destroySubjects,

        takeUntilDestroyedCandidates,

        destroyRefDetected

    };

    

    report.rxjsValidation = {

      modernizationScore:
        rxjsValidation.modernizationScore,

      memoryLeakScore:
        rxjsValidation.memoryLeakScore,

      recommendations:
        rxjsValidation.recommendations,

      validationPassed:
        rxjsValidation.validationPassed

    };

    report.rxjs = {

      modernizationScore:
        rxjsValidation.modernizationScore,

      memoryLeakScore:
        rxjsValidation.memoryLeakScore,

      deprecatedOperators:
        deprecatedRxjsOperators,

      unmanagedSubscriptions,

      destroySubjects

    };

    const aiReport = await this.aiAdvisor.analyze(report);

    report.ai = {

      projectRisk: aiReport.projectRisk,

      confidenceScore: aiReport.confidenceScore,

      recommendationCount:
        aiReport.recommendations.length

    };
   
    

    const reportPath = await this.reportService.generate(projectPath, report);

    const validation = await this.validator.validate(projectPath);

    report.validation = validation;

    report.dependencyInjection = {
      constructorsFound: constructorCount,

      injectCalls: injectCount,

      httpProviders,

      animationProviders,

      routerProviders,

      functionalProviders,
    };

    report.lazyLoading = {
      loadChildren: lazyRoutes,

      loadComponent: loadComponents,

      skipped: skippedLazyRoutes,
    };

    report.routeOptimization = {
      duplicateRoutes,

      duplicateRedirects,

      normalizedRoutes,

      optimizedRoutes,
    };

    report.deadRouteAnalysis = {
      deadRoutes,

      wildcardIssues,

      duplicatePaths,

      emptyPathConflicts,

      warnings: routingWarnings,
    };

    report.circularRouteAnalysis = {
      circularDependencies,

      cycles: circularCycles,
    };

    const routingSummary = this.routingReport.generate({
      totalRoutes,

      lazyRoutes,

      standaloneRoutes,

      duplicateRoutes: duplicatePaths,

      deadRoutes,

      wildcardIssues,

      circularDependencies,
    });

    report.routingReport = routingSummary;

    report.changeDetection = this.changeDetection.getReport();

    report.signalOptimization = this.signalOptimizer.getReport();

    const dashboard: MigrationDashboard = {
      projectName: report.projectName,

      angularVersion: '8',

      targetVersion: '16',

      totalFiles: summary.files,

      migratedFiles: migrated,

      templatesMigrated: validTemplates,

      validationPassed: validation.build && validation.lint,

      confidenceScore,

      risk:
        confidenceScore >= 90
          ? 'LOW'
          : confidenceScore >= 70
            ? 'MEDIUM'
            : 'HIGH',

      dependencyInjection: {
        constructorsFound: constructorCount,

        injectCalls: injectCount,

        httpProviders,

        animationProviders,

        routerProviders,

        functionalProviders,
      },
      

      generatedAt: new Date(),
    };

    const dashboardFile = await this.dashboardService.generate(
      projectPath,
      dashboard,
    );

    console.log(`Dashboard : ${dashboardFile}`);

    this.rollbackService.addHistory(

            projectPath,

            'SUCCESS',

            checkpoint.id

        );

    const prFile = await this.prGenerator.generate(projectPath, report);

    const summaryFile = path.join(projectPath, 'migration-summary.json');

    const templateResult = await this.templateMigration.migrate(projectPath);

    const templateValidation = validationResults;

    console.log('\nTemplate Validation');

    console.table(
      templateValidation.map((v) => ({
        File: v.file,

        Valid: v.valid,

        Warnings: v.warnings.join(', '),
      })),
    );

    await fs.writeJson(
      summaryFile,

      {
        report,

    validation,

    aiReport,

    executiveSummary: {

      generatedAt: new Date(),

      projectRisk: aiReport.projectRisk,

      riskScore: aiReport.riskScore,

      confidenceScore: aiReport.confidenceScore,

      migrationStrategy: aiReport.migrationStrategy,

      recommendationCount:
        aiReport.recommendations.length
        }
      },

      {
        spaces: 2,
      },
    );

    console.log('');

    console.log('===================================');

    console.log('Migration Completed');

    console.log('===================================');

    console.log(`Files Migrated : ${migrated}`);

    console.log(`Templates Valid : ${validTemplates}/${totalTemplates}`);

    console.log(`Confidence Score : ${confidenceScore}%`);

    console.log(`Report : ${reportPath}`);

    console.log(`PR : ${prFile}`);

    console.log(`Summary : ${summaryFile}`);

    console.log('===================================');

    console.log('');

    console.log('Provider Optimization');

    console.log(`HttpClientModule : ${httpProviders}`);

    console.log(`BrowserAnimationsModule : ${animationProviders}`);

    console.log(`Root Providers : ${rootProviders}`);

    console.log(`Functional Providers : ${functionalProviders}`);

    console.log('');
    console.log('========== Dependency Injection ==========');

    console.table({
      Constructors: constructorCount,

      InjectCalls: injectCount,

      HttpProviders: httpProviders,

      AnimationProviders: animationProviders,

      RouterProviders: routerProviders,

      FunctionalProviders: functionalProviders,
    });

    console.log('');

    console.log('========== Lazy Loading ==========');

    console.table({
      LoadChildren: lazyRoutes,

      LoadComponent: loadComponents,

      Skipped: skippedLazyRoutes,
    });

    console.log('');

    console.log('========== Route Optimization ==========');

    console.table({
      DuplicateRoutes: duplicateRoutes,

      DuplicateRedirects: duplicateRedirects,

      NormalizedRoutes: normalizedRoutes,

      OptimizedRoutes: optimizedRoutes,
    });

    console.log('');

    console.log('========== Dead Route Analysis ==========');

    console.table({
      DeadRoutes: deadRoutes,

      WildcardIssues: wildcardIssues,

      DuplicatePaths: duplicatePaths,

      EmptyPathConflicts: emptyPathConflicts,
    });

    if (routingWarnings.length) {
      console.log('');

      console.log('Routing Warnings');

      routingWarnings.forEach((w) => console.log(`⚠ ${w}`));
    }

    console.log('');

    console.log('========== Circular Route Analysis ==========');

    console.table({
      CircularDependencies: circularDependencies,

      Cycles: circularCycles.length,
    });

    if (circularCycles.length) {
      console.log('');

      console.log('Detected Cycles');

      circularCycles.forEach((cycle) => console.log(cycle.join(' -> ')));
    }

    console.log('');

    console.log('========== Routing Report ==========');

    console.table({
      TotalRoutes: routingSummary.totalRoutes,

      LazyRoutes: routingSummary.lazyRoutes,

      StandaloneRoutes: routingSummary.standaloneRoutes,

      DeadRoutes: routingSummary.deadRoutes,

      DuplicateRoutes: routingSummary.duplicateRoutes,

      CircularDependencies: routingSummary.circularDependencies,

      HealthScore: routingSummary.healthScore + '%',
    });

    if (routingSummary.recommendations.length) {
      console.log('');

      console.log('Recommendations');

      routingSummary.recommendations.forEach((r) => console.log(`✔ ${r}`));
    }

    console.log('');

    console.log('======================================');

    console.log('Enterprise Performance Dashboard');

    console.log('======================================');

    console.log(`Overall Score : ${performanceDashboard.overallScore}`);

    console.log(`Grade         : ${performanceDashboard.grade}`);

    console.log(`Bundle Score  : ${performanceDashboard.bundleScore}`);

    console.log(`Signals Score : ${performanceDashboard.signalScore}`);

    console.log(`OnPush Score  : ${performanceDashboard.changeDetectionScore}`);

    console.log(`Tree Shaking  : ${performanceDashboard.treeShakingScore}`);

    console.log(
      `Bundle Size   : ${performanceDashboard.estimatedBundleSize} KB`,
    );

    console.log(`Saving        : ${performanceDashboard.estimatedSaving} KB`);

    console.log('');

    console.log('Recommendations');

    performanceDashboard.recommendations.forEach((r) => console.log(`• ${r}`));

    console.log('======================================');

    console.log('');

    console.log('Angular Material');

    console.log('----------------------------');

    console.log(`Legacy Imports : ${totalLegacyImports}`);

    console.log(`Migrated       : ${totalMigratedImports}`);
    console.log(`Themes Migrated : ${migratedThemes}`);
    console.log(`Typography Updated : ${typographyMigrated}`);

    console.log(`Icons Detected : ${iconsDetected}`);

    console.log(`MDC Components : ${materialValidation.totalMdcComponents}`);

    console.log(`Recommendations :`);

    materialValidation.recommendations.forEach((r) => console.log(` - ${r}`));

    console.log('');

    console.log('RxJS Analysis');

    console.log('----------------------------');

    console.log(`RxJS Imports      : ${totalRxjsImports}`);

    console.log(`Observable        : ${observableCount}`);

    console.log(`Subject           : ${subjectCount}`);

    console.log(`BehaviorSubject   : ${behaviorSubjectCount}`);

    console.log(`ReplaySubject     : ${replaySubjectCount}`);

    console.log(`AsyncSubject      : ${asyncSubjectCount}`);

    console.log(`Subscription      : ${subscriptionCount}`);

    console.log(`Deprecated Operators Migrated : ${deprecatedRxjsOperators}`);

    console.log('');

    console.log('Subscription Analysis');

    console.log('----------------------------');

    console.log(`Subscriptions          : ${totalSubscriptions}`);

    console.log(`takeUntil Usage        : ${takeUntilUsage}`);

    console.log(`Unmanaged              : ${unmanagedSubscriptions}`);

    console.log(`OnDestroy Components   : ${ngOnDestroyComponents}`);

    console.log(
      `Memory Leak Risk       : ${report.subscriptionAnalysis?.memoryLeakRisk}`,
    );

    console.log('');

    console.log('Angular 16 Cleanup');

    console.log('----------------------------');

    console.log(
      `Destroy Subjects            : ${destroySubjects}`
    );

    console.log(
      `takeUntilDestroyed Candidates : ${takeUntilDestroyedCandidates}`
    );

    console.log(
      `DestroyRef Detected         : ${destroyRefDetected}`
    );

    console.log('');

    console.log('RxJS Validation');

    console.log('----------------------------');

    console.log(
      `Modernization Score : ${rxjsValidation.modernizationScore}%`
    );

    console.log(
      `Memory Leak Score   : ${rxjsValidation.memoryLeakScore}%`
    );

    console.log(
      `Validation Passed   : ${rxjsValidation.validationPassed}`
    );

    console.log('');

    console.log('Recommendations');

    rxjsValidation.recommendations.forEach(r =>

      console.log(`• ${r}`)

    );

    console.log('');

    console.log('AI Migration Advisor');

    console.log('----------------------------');

    console.log(
      `Project Risk      : ${aiReport.projectRisk}`
    );

    console.log(
      `Confidence Score : ${aiReport.confidenceScore}%`
    );

    console.log('');

    console.log('Risk Factors');

    aiReport.riskFactors.forEach(f =>

      console.log(`• ${f}`)

    );

    console.log('');

    console.log('Recommendations');

    aiReport.recommendations.forEach(r =>{

      console.log(

        `• [${r.priority}] ${r.title}`

      );

    console.log(

      `   Effort : ${r.effort}`

    );

    console.log(

      `   ${r.description}`

    );

  });

  console.log('');

console.log('AI Executive Summary');

console.log('----------------------------');

console.log(aiReport.llmSummary);

console.log('');

console.log('Migration Strategy');

console.log(aiReport.migrationStrategy);

console.log('');

console.log('LLM Recommendations');

aiReport.llmRecommendations.forEach(r =>

  console.log(`• ${r}`)

);

    return {
      status: 'SUCCESS',

      migrated,

      summary,

      report,

      reportPath,

      validation,

      prFile,

      summaryFile,

      templateResult,

      templateValidation,

      dashboard,

      dashboardFile,

      materialValidation,
      rxjsMigration: report.rxjsMigration,

      subscriptionAnalysis: report.subscriptionAnalysis,
    };
    } catch (error) {

        this.rollbackService.automaticRecovery(

            false,

            checkpoint.id

        );

        throw error;

    }
  }

  /**
   * Collect project statistics
   */
  private inspectSourceFile(source: ts.SourceFile, summary: any) {
    const visit = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        const decorators = ts.getDecorators(node) ?? [];

        decorators.forEach((d) => {
          const expression = d.expression;

          if (ts.isCallExpression(expression)) {
            const name = expression.expression.getText();

            switch (name) {
              case 'Component':
                summary.components++;
                break;

              case 'NgModule':
                summary.modules++;
                break;

              case 'Injectable':
                summary.services++;
                break;
            }
          }
        });
      }

      ts.forEachChild(node, visit);
    };

    visit(source);
  }

  private async resolveTemplateImports(
    componentFile: string,
  ): Promise<string[]> {
    const htmlFile = componentFile.replace('.ts', '.html');

    const exists = await fs.pathExists(htmlFile);

    if (!exists) {
      return [];
    }

    //----------------------------------
    // Read template
    //----------------------------------

    let template = await fs.readFile(htmlFile, 'utf8');

    //----------------------------------
    // Day 16 Part 2
    // Convert *ngIf -> @if
    // Convert *ngFor -> @for
    // Convert ngSwitch -> @switch
    //----------------------------------

    template = this.controlFlow.migrate(template);

    //----------------------------------
    // Save migrated template
    //----------------------------------

    await fs.writeFile(htmlFile, template, 'utf8');

    //----------------------------------
    // Resolve imports from updated template
    //----------------------------------

    return this.resolver.resolve(template);
  }

  private injectImports(
    source: string,

    imports: string[],
  ): string {
    if (imports.length === 0) {
      return source;
    }

    const formatted = imports.join(',\n');

    return source.replace(
      /imports:\s*\[[^\]]*\]/,

      `imports:[
    ${formatted}
    ]`,
    );
  }
}
