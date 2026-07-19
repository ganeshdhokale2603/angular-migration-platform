import { Injectable } from '@nestjs/common';

import { StageExecutor } from './stage.executor';

import { ExecutionContext } from '../models/execution-context';

import { PipelineStage } from '../models/pipeline-stage';
import { StageRegistry } from '../registry/stage.registry';

@Injectable()
export class PipelineService {

    constructor(

        private readonly executor: StageExecutor,
        private readonly registry: StageRegistry

    ) { }

    async execute(

        context: ExecutionContext

    ) {

        const stages = this.registry

            .getStages()

            .filter(s => s.enabled)

            .sort((a, b) => a.order - b.order);

        const started = Date.now();

        context.logs.push(
            'Pipeline started.'
        );

        for (const stage of stages) {

            await this.executor.execute(

                context,

                stage.stage

            );

        }

        context.metrics.completedAt =

        new Date();

        context.metrics.elapsedTime =

        Date.now() - started;

        context.progress.status =

        'Completed';

        context.logs.push(
            'Pipeline completed.'
        );

        return context;

    }

}