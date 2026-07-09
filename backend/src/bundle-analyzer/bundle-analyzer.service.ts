import { Injectable } from '@nestjs/common';
import { BundlePerformanceReport } from './bundle-performance.report';

@Injectable()
export class BundleAnalyzerService {
  analyze(data: {
    totalComponents: number;

    standaloneComponents: number;

    lazyRoutes: number;

    totalRoutes: number;

    signalComponents: number;

    treeShakingScore: number;
  }): BundlePerformanceReport {
    const standaloneCoverage =
      data.totalComponents === 0
        ? 100
        : Math.round((data.standaloneComponents / data.totalComponents) * 100);

    const lazyCoverage =
      data.totalRoutes === 0
        ? 100
        : Math.round((data.lazyRoutes / data.totalRoutes) * 100);

    const signalCoverage =
      data.totalComponents === 0
        ? 100
        : Math.round((data.signalComponents / data.totalComponents) * 100);

    const performanceScore = Math.round(
      standaloneCoverage * 0.25 +
        lazyCoverage * 0.25 +
        signalCoverage * 0.2 +
        data.treeShakingScore * 0.3,
    );

    const estimatedBundleSize = Math.max(120, 450 - performanceScore * 2);

    const estimatedSaving = 450 - estimatedBundleSize;

    return {
      estimatedBundleSize,

      estimatedSaving,

      lazyLoadingCoverage: lazyCoverage,

      standaloneCoverage,

      signalCoverage,

      treeShakingScore: data.treeShakingScore,

      performanceScore,
    };
  }
}
