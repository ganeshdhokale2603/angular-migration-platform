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
}

export interface ValidationResult {
  npmInstall: boolean;
  build: boolean;
  lint: boolean;
  logs: string[];
}
