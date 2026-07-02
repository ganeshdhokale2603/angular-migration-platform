import { Injectable } from '@nestjs/common';
import { MigrationPlan } from '../models/migration-plan';
import { MigrationStep } from '../models/migration-step';

@Injectable()
export class MigrationPlannerService {
  createPlan(scan: any): MigrationPlan {
    const steps: MigrationStep[] = [];

    let id = 1;

    if (scan.statistics.componentCount) {
      steps.push({
        id: id++,

        title: 'Scan Components',

        description: 'Analyze Angular components.',

        status: 'PENDING',

        automated: true,
      });
    }

    if (scan.statistics.moduleCount) {
      steps.push({
        id: id++,

        title: 'Convert NgModules',

        description: 'Prepare migration to standalone architecture.',

        status: 'PENDING',

        automated: true,
      });
    }

    if (scan.issues?.length > 0) {
      steps.push({
        id: id++,

        title: 'Resolve Migration Issues',

        description: 'Fix deprecated APIs before migration.',

        status: 'PENDING',

        automated: false,
      });
    }

    steps.push({
      id: id++,

      title: 'Upgrade Angular',

      description: 'Execute ng update.',

      status: 'PENDING',

      automated: true,
    });

    return {
      totalSteps: steps.length,

      estimatedTime: `${steps.length * 5} mins`,

      steps,
    };
  }
}
