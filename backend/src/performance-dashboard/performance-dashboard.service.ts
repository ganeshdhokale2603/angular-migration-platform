import { Injectable } from '@nestjs/common';
import { PerformanceDashboard } from './models/performance-dashboard';

@Injectable()
export class PerformanceDashboardService {
  generate(data: {
    bundleScore: number;

    changeDetectionScore: number;

    signalScore: number;

    treeShakingScore: number;

    estimatedBundleSize: number;

    estimatedSaving: number;
  }): PerformanceDashboard {
    const overallScore = Math.round(
      data.bundleScore * 0.35 +
        data.changeDetectionScore * 0.2 +
        data.signalScore * 0.2 +
        data.treeShakingScore * 0.25,
    );

    let grade: 'A' | 'B' | 'C' | 'D';

    if (overallScore >= 90) {
      grade = 'A';
    } else if (overallScore >= 80) {
      grade = 'B';
    } else if (overallScore >= 70) {
      grade = 'C';
    } else {
      grade = 'D';
    }

    const recommendations: string[] = [];

    if (data.bundleScore < 90) {
      recommendations.push('Increase lazy loading coverage.');
    }

    if (data.signalScore < 80) {
      recommendations.push('Convert more BehaviorSubjects to Signals.');
    }

    if (data.changeDetectionScore < 90) {
      recommendations.push('Adopt OnPush change detection.');
    }

    if (data.treeShakingScore < 95) {
      recommendations.push('Remove unused imports and providers.');
    }

    return {
      overallScore,

      grade,

      bundleScore: data.bundleScore,

      changeDetectionScore: data.changeDetectionScore,

      signalScore: data.signalScore,

      treeShakingScore: data.treeShakingScore,

      estimatedBundleSize: data.estimatedBundleSize,

      estimatedSaving: data.estimatedSaving,

      recommendations,
    };
  }
}
