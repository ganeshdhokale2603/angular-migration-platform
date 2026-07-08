export interface MigrationDashboard {
  projectName: string;

  angularVersion: string;

  targetVersion: string;

  totalFiles: number;

  migratedFiles: number;

  templatesMigrated: number;

  validationPassed: boolean;

  confidenceScore: number;

  risk: 'LOW' | 'MEDIUM' | 'HIGH';

   dependencyInjection: {
    constructorsFound: number;

    injectCalls: number;

    httpProviders: number;

    animationProviders: number;

    routerProviders: number;

    functionalProviders: number;
  };
  routing?: {

    totalRoutes: number;

    lazyRoutes: number;

    standaloneRoutes: number;

    duplicateRoutes: number;

    deadRoutes: number;

    wildcardIssues: number;

    circularDependencies: number;

    healthScore: number;

    };

  generatedAt: Date;
}
