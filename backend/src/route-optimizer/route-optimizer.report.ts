export interface RouteOptimizerReport {
  routesScanned: number;

  duplicateRoutes: number;

  duplicateRedirects: number;

  normalizedRoutes: number;

  optimizedRoutes: number;
}
