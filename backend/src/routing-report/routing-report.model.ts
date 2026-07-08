export interface RoutingReport {
  totalRoutes: number;

  lazyRoutes: number;

  standaloneRoutes: number;

  duplicateRoutes: number;

  deadRoutes: number;

  wildcardIssues: number;

  circularDependencies: number;

  healthScore: number;

  recommendations: string[];
}
