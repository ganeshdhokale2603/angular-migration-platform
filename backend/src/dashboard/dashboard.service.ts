import { Injectable } from '@nestjs/common';
import { DashboardModel } from './models/dashboard.model';

@Injectable()
export class DashboardService {

  getMetrics() {
    return this.getDashboard().metrics;
  }

  getHistory() {
    return this.getDashboard().history;
  }

  getPerformance() {
    return this.getDashboard().performance;
  }

  getAI() {
    return this.getDashboard().ai;
  }

  getDashboard(): DashboardModel {

    const filesScanned = 250;
    const filesMigrated = 185;

    const remainingFiles =
      filesScanned - filesMigrated;

    const migrationPercentage = Math.round(
      (filesMigrated / filesScanned) * 100
    );

    return {

      projectName: 'Angular Migration Platform',

      generatedAt: new Date(),

      history: [

        {
          id: 1,
          projectName: 'Angular 8 Demo',
          executedAt: new Date(),
          status: 'SUCCESS',
          duration: 152
        },

        {
          id: 2,
          projectName: 'Angular 12 Portal',
          executedAt: new Date(),
          status: 'PARTIAL',
          duration: 238
        },

        {
          id: 3,
          projectName: 'Angular 15 Admin',
          executedAt: new Date(),
          status: 'FAILED',
          duration: 54
        }

      ],

      progress: {

        filesScanned,

        filesMigrated,

        remainingFiles,

        migrationPercentage,

        completed: migrationPercentage === 100

      },

      metrics: [

        {
          name: 'Components',
          value: 42
        },

        {
          name: 'Modules',
          value: 8
        },

        {
          name: 'Services',
          value: 26
        },

        {
          name: 'Signals',
          value: 24
        },

        {
          name: 'Bundle Score',
          value: 92,
          unit: '%'
        },

        {
          name: 'Tree Shaking',
          value: 95,
          unit: '%'
        }

      ],

      performance: {

        changeDetectionOptimized: 38,

        signalsMigrated: 24,

        deadCodeRemoved: 61,

        bundleScore: 92,

        treeShakingScore: 95

      },

      charts: [

        {

          title: 'Migration Progress',

          labels: [

            'Migrated',

            'Remaining'

          ],

          values: [

            filesMigrated,

            remainingFiles

          ]

        },

        {

          title: 'Performance',

          labels: [

            'Bundle',

            'Tree Shaking'

          ],

          values: [

            92,

            95

          ]

        },

        {

          title: 'Routing',

          labels: [

            'Lazy',

            'Dead',

            'Duplicate'

          ],

          values: [

            14,

            2,

            1

          ]

        }

      ],

      validation: {

        buildPassed: true,

        lintPassed: true,

        npmInstallPassed: true,

        logs: [

          'Build Successful',

          'Lint Passed',

          'Dependencies Installed'

        ]

      },

      reports: {

        totalReports: 8,

        latestReport: 'migration-summary.json',

        generatedAt: new Date()

      },

      prSummary: {

        title: 'Angular Migration Platform',

        filesChanged: 142,

        additions: 6845,

        deletions: 932,

        summary:
          'Migrated to Angular 20 with Signals, Standalone Components, Material MDC, RxJS modernization and AI Advisor.'

      },

      ai: {

    projectRisk: 'LOW',

    confidenceScore: 95,

    riskScore: 8,

    riskFactors: [

        'Legacy Angular modules',

        'RxJS upgrade required'

    ],

    recommendations: [],

    

}

    };

  }

}