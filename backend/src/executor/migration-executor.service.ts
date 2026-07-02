import { Injectable } from '@nestjs/common';
import { MigrationPlan } from '../models/migration-plan';
import { ExecutionResult } from './models/execution-result';
import { ExecutionLog } from './models/execution-log';

@Injectable()
export class MigrationExecutorService {

  async execute(plan: MigrationPlan): Promise<ExecutionResult> {

    const logs: ExecutionLog[] = [];

    const started = Date.now();

    let completed = 0;

    let failed = 0;

    for (const step of plan.steps) {

      const start = new Date();

      try {

        step.status = 'RUNNING';

        await this.executeStep(step);

        step.status = 'COMPLETED';

        completed++;

        logs.push({

          stepId: step.id,

          title: step.title,

          status: 'COMPLETED',

          startedAt: start,

          finishedAt: new Date(),

          message: 'Executed successfully.'

        });

      }

      catch {

        step.status = 'FAILED';

        failed++;

        logs.push({

          stepId: step.id,

          title: step.title,

          status: 'FAILED',

          startedAt: start,

          finishedAt: new Date(),

          message: 'Execution failed.'

        });

      }

    }

    return {

      completedSteps: completed,

      failedSteps: failed,

      executionTime: Date.now() - started,

      logs

    };

  }

  private async executeStep(step: any): Promise<void> {

    console.log(`Executing ${step.title}`);

    await new Promise(resolve => setTimeout(resolve,1000));

  }

}