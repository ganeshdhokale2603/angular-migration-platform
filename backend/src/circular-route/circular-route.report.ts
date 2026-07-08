export interface CircularRouteReport {
  routesAnalyzed: number;

  circularDependencies: number;

  cycles: string[][];
}
