import { Injectable } from '@nestjs/common';
import { RoutingReport } from './routing-report.model';

@Injectable()
export class RoutingReportService {
  generate(data: {
    totalRoutes: number;

    lazyRoutes: number;

    standaloneRoutes: number;

    duplicateRoutes: number;

    deadRoutes: number;

    wildcardIssues: number;

    circularDependencies: number;
  }): RoutingReport {
    let score = 100;

    score -= data.deadRoutes * 5;

    score -= data.duplicateRoutes * 3;

    score -= data.circularDependencies * 8;

    score -= data.wildcardIssues * 5;

    if (score < 0) {
      score = 0;
    }

    const recommendations: string[] = [];

    if (data.deadRoutes > 0) {
      recommendations.push('Remove unreachable routes.');
    }

    if (data.duplicateRoutes > 0) {
      recommendations.push('Merge duplicate routes.');
    }

    if (data.circularDependencies > 0) {
      recommendations.push('Break circular lazy-loaded dependencies.');
    }

    if (data.wildcardIssues > 0) {
      recommendations.push('Move wildcard route to the end.');
    }

    return {
      ...data,

      healthScore: score,

      recommendations,
    };
  }
}
