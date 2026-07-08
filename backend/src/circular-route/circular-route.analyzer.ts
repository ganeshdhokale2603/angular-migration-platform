import { CircularRouteReport } from './circular-route.report';

export class CircularRouteAnalyzer {
  analyze(source: string): CircularRouteReport {
    const graph = new Map<string, string[]>();

    const regex =
      /path\s*:\s*['"`](.*?)['"`][\s\S]*?loadChildren\s*:\s*\(\)\s*=>\s*import\((.*?)\)/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(source)) !== null) {
      const route = match[1];

      const target = match[2].replace(/['"`]/g, '').replace('./', '');

      if (!graph.has(route)) {
        graph.set(route, []);
      }

      graph.get(route)!.push(target);
    }

    const visited = new Set<string>();

    const stack = new Set<string>();

    const cycles: string[][] = [];

    const dfs = (node: string, path: string[]) => {
      if (stack.has(node)) {
        cycles.push([...path, node]);

        return;
      }

      if (visited.has(node)) {
        return;
      }

      visited.add(node);

      stack.add(node);

      const neighbours = graph.get(node) || [];

      neighbours.forEach((n) => {
        dfs(n, [...path, node]);
      });

      stack.delete(node);
    };

    [...graph.keys()].forEach((node) => dfs(node, []));

    return {
      routesAnalyzed: graph.size,

      circularDependencies: cycles.length,

      cycles,
    };
  }
}
