import { DeadRouteReport } from './dead-route.report';

export class DeadRouteDetector {
  analyze(source: string): DeadRouteReport {
    const warnings: string[] = [];

    const routeRegex = /path\s*:\s*['"`](.*?)['"`]/g;

    const routes: string[] = [];

    let match: RegExpExecArray | null;

    while ((match = routeRegex.exec(source)) !== null) {
      routes.push(match[1]);
    }

    let wildcardFound = false;

    let deadRoutes = 0;

    let wildcardIssues = 0;

    let emptyPathConflicts = 0;

    let duplicatePaths = 0;

    const seen = new Set<string>();

    routes.forEach((route) => {
      if (wildcardFound) {
        deadRoutes++;

        warnings.push(`Dead route detected: ${route}`);
      }

      if (route === '**') {
        wildcardFound = true;
      }

      if (seen.has(route)) {
        duplicatePaths++;

        warnings.push(`Duplicate route: ${route}`);
      }

      seen.add(route);
    });

    const emptyRoutes = routes.filter((r) => r === '').length;

    if (emptyRoutes > 1) {
      emptyPathConflicts = emptyRoutes - 1;

      warnings.push('Multiple empty routes detected');
    }

    if (wildcardFound && routes[routes.length - 1] !== '**') {
      wildcardIssues++;

      warnings.push('Wildcard route should be last');
    }

    return {
      totalRoutes: routes.length,

      deadRoutes,

      wildcardIssues,

      duplicatePaths,

      emptyPathConflicts,

      warnings,
    };
  }
}
