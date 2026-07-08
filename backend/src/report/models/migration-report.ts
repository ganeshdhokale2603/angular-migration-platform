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

  providerOptimization?: {
    httpClient: number;

    animations: number;

    router: number;

    rootProviders: number;

    functionalProviders: number;
  };
}

export interface ValidationResult {
  npmInstall: boolean;
  build: boolean;
  lint: boolean;
  logs: string[];
}
