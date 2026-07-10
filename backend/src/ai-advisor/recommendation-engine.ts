import { Injectable } from '@nestjs/common';

import { MigrationReport } from '../report/models/migration-report';

import { AIRecommendation } from './ai.recommendation';

@Injectable()
export class RecommendationEngine {

  generate(

    report: MigrationReport

  ): AIRecommendation[] {

    const recommendations: AIRecommendation[] = [];

    if ((report.materialMigration?.legacyImports ?? 0) > 0) {

      recommendations.push({

        title: 'Complete Material MDC Migration',

        description:
          'Legacy Material imports should be migrated before Angular upgrades.',

        severity: 'HIGH',

        priority: 'CRITICAL',

        effort: 'LARGE',

        category: 'Material'

      });

    }

    if ((report.rxjsMigration?.deprecatedOperators ?? 0) > 0) {

      recommendations.push({

        title: 'Modernize RxJS',

        description:
          'Replace deprecated RxJS APIs with current equivalents.',

        severity: 'MEDIUM',

        priority: 'HIGH',

        effort: 'MEDIUM',

        category: 'RxJS'

      });

    }

    if ((report.subscriptionAnalysis?.unmanagedSubscriptions ?? 0) > 0) {

      recommendations.push({

        title: 'Fix Subscription Cleanup',

        description:
          'Replace manual cleanup with takeUntilDestroyed().',

        severity: 'HIGH',

        priority: 'HIGH',

        effort: 'SMALL',

        category: 'RxJS'

      });

    }

    if ((report.changeDetection?.skippedComponents ?? 0) > 0) {

      recommendations.push({

        title: 'Optimize Change Detection',

        description:
          'Use OnPush strategy where possible.',

        severity: 'MEDIUM',

        priority: 'MEDIUM',

        effort: 'MEDIUM',

        category: 'Performance'

      });

    }

    if ((report.dependencyInjection?.constructorsFound ?? 0) > 0) {

      recommendations.push({

        title: 'Adopt inject() API',

        description:
          'Replace constructor injection with inject() where appropriate.',

        severity: 'LOW',

        priority: 'LOW',

        effort: 'SMALL',

        category: 'DependencyInjection'

      });

    }

    return recommendations.sort((a, b) => {

      const order = {

        CRITICAL: 4,

        HIGH: 3,

        MEDIUM: 2,

        LOW: 1

      };

      return order[b.priority] - order[a.priority];

    });

  }

}