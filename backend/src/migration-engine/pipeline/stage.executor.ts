import { Injectable } from '@nestjs/common';

import { ExecutionContext } from '../models/execution-context';
import { PipelineStage } from '../models/pipeline-stage';
import { EventBusService } from '../events/event-bus.service';

@Injectable()
export class StageExecutor {

    constructor(

    private readonly eventBus: EventBusService

    ){}

    async execute(

        context: ExecutionContext,

        stage: PipelineStage

    ): Promise<void> {

        context.currentStage = stage;
        this.eventBus.publish({

            type: 'StageStarted',

            timestamp: new Date(),

            executionId: context.executionId,

            stage,

            message: `${stage} started`

        });

        context.progress.currentStage = stage;

        context.progress.currentStageName =

            stage

            .replace(/_/g, ' ');

            context.progress.status =

            'Running';

        console.log(

            `Executing ${stage}`

        );

        context.logs.push(
            `Started ${stage}`
        );

        await this.delay();

        context.completedStages.push(stage);

        context.progress.completedStages =
            context.completedStages.length;

        context.progress.percentage =
            Math.round(

                (context.completedStages.length /
                    context.progress.totalStages) * 100

            );

        const completed =

        context.progress.completedStages;

        const remaining =

        context.progress.totalStages - completed;

        context.metrics.estimatedRemaining =

        remaining * 300;

        context.logs.push(
            `${stage} completed`
        );
        context.metrics.successfulStages++;

                this.eventBus.publish({

            type: 'StageCompleted',

            timestamp: new Date(),

            executionId: context.executionId,

            stage,

            message: `${stage} completed`

        });

    }

    private delay() {

        return new Promise(resolve =>

            setTimeout(resolve, 300)

        );

    }

}