import { RouteOptimizerReport } from './route-optimizer.report';

export class RouteOptimizerTransformer {
  optimize(source: string): {
    source: string;

    report: RouteOptimizerReport;
  } {
    const routeRegex = /path\s*:\s*['"`](.*?)['"`]/g;

    const seen = new Set<string>();

    let duplicateRoutes = 0;

    let normalizedRoutes = 0;

    let optimized = source;

    optimized = optimized.replace(
      routeRegex,

      (match, path) => {
        const normalized = path.trim().replace(/\/+/g, '/');

        if (normalized !== path) {
          normalizedRoutes++;
        }

        if (seen.has(normalized)) {
          duplicateRoutes++;
        } else {
          seen.add(normalized);
        }

        return `path: '${normalized}'`;
      },
    );

    const redirectRegex = /redirectTo\s*:\s*['"`](.*?)['"`]/g;

    const redirects = new Set<string>();

    let duplicateRedirects = 0;

    optimized.replace(
      redirectRegex,

      (_, redirect) => {
        if (redirects.has(redirect)) {
          duplicateRedirects++;
        }

        redirects.add(redirect);

        return _;
      },
    );

    return {
      source: optimized,

      report: {
        routesScanned: seen.size + duplicateRoutes,

        duplicateRoutes,

        duplicateRedirects,

        normalizedRoutes,

        optimizedRoutes: normalizedRoutes + duplicateRoutes,
      },
    };
  }
}
