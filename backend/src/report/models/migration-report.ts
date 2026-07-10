import { BundlePerformanceReport } from 'src/bundle-analyzer/bundle-performance.report';

export interface MigrationReport {
  projectName: string;

  filesScanned: number;

  filesMigrated: number;

  components: number;

  modules: number;

  services: number;

  generatedAt: Date;

  validation?: ValidationResult;

  templateValidation?: any[];

  confidenceScore?: number;

  dependencyInjection?: {
    constructorsFound: number;

    injectCalls: number;

    httpProviders: number;

    animationProviders: number;

    routerProviders: number;

    functionalProviders: number;
  };
  lazyLoading?: {
    loadChildren: number;

    loadComponent: number;

    skipped: number;
  };

  routeOptimization?: {
    duplicateRoutes: number;

    duplicateRedirects: number;

    normalizedRoutes: number;

    optimizedRoutes: number;
  };

  deadRouteAnalysis?: {
    deadRoutes: number;

    wildcardIssues: number;

    duplicatePaths: number;

    emptyPathConflicts: number;

    warnings: string[];
  };
  circularRouteAnalysis?: {
    circularDependencies: number;

    cycles: string[][];
  };

  routingReport?: {
    totalRoutes: number;

    lazyRoutes: number;

    standaloneRoutes: number;

    duplicateRoutes: number;

    deadRoutes: number;

    wildcardIssues: number;

    circularDependencies: number;

    healthScore: number;

    recommendations: string[];
  };

  changeDetection?: {
    totalComponents: number;

    alreadyUsingOnPush: number;

    optimizedComponents: number;

    skippedComponents: number;
  };

  signalOptimization?: {
    filesScanned: number;

    behaviorSubjectsFound: number;

    signalsCreated: number;

    computedSuggestions: number;

    effectSuggestions: number;
  };

  deadCode?: {
    filesScanned: number;

    unusedImports: number;

    unusedProviders: number;

    unusedComponents: number;

    unusedServices: number;

    treeShakingScore: number;
  };

  bundlePerformance?: BundlePerformanceReport;

  performanceDashboard?: {
    overallScore: number;

    grade: 'A' | 'B' | 'C' | 'D';

    bundleScore: number;

    changeDetectionScore: number;

    signalScore: number;

    treeShakingScore: number;

    estimatedBundleSize: number;

    estimatedSaving: number;

    recommendations: string[];
  };

  providerOptimization?: {
    httpClient: number;

    animations: number;

    router: number;

    rootProviders: number;

    functionalProviders: number;
  };

  materialScan?: {
    materialVersion: string;

    totalMaterialImports: number;

    legacyImports: number;

    mdcImports: number;

    componentsUsingMaterial: number;

    materialModules: string[];
  };

  materialMigration?: {
    legacyImports: number;

    migratedImports: number;

    themesMigrated: number;
    typographyMigrated: number;

    iconsDetected: number;
    compatibilityScore: number;
  };

  rxjsMigration?: {
    totalImports: number;

    deprecatedOperators: number;

    observableCount: number;

    subjectCount: number;

    behaviorSubjectCount: number;

    replaySubjectCount: number;

    asyncSubjectCount: number;

    subscriptionCount: number;
  };
  subscriptionAnalysis?: {
    totalSubscriptions: number;

    unmanagedSubscriptions: number;

    takeUntilUsage: number;

    ngOnDestroyComponents: number;

    memoryLeakRisk: string;
  };
  cleanupAnalysis?: {

    destroySubjects: number;

    takeUntilDestroyedCandidates: number;

    destroyRefDetected: number;

  };
  rxjsValidation?: {

    modernizationScore: number;

    memoryLeakScore: number;

    recommendations: string[];

    validationPassed: boolean;

  };

  rxjs?: {

    modernizationScore: number;

    memoryLeakScore: number;

    deprecatedOperators: number;

    unmanagedSubscriptions: number;

    destroySubjects: number;

  };
  ai?: {

    projectRisk: 'LOW' | 'MEDIUM' | 'HIGH';

    confidenceScore: number;

    recommendationCount: number;

  };

}

export interface ValidationResult {
  npmInstall: boolean;
  build: boolean;
  lint: boolean;
  logs: string[];
}
