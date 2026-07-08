export interface DeadRouteReport {
  totalRoutes: number;

  deadRoutes: number;

  wildcardIssues: number;

  duplicatePaths: number;

  emptyPathConflicts: number;

  warnings: string[];
}
