import { Injectable } from '@nestjs/common';

import { PipelineStage } from '../models/pipeline-stage';
import { StageDefinition } from '../models/stage-definition.model';

@Injectable()
export class StageRegistry {

    getStages(): StageDefinition[] {

        return [

            {
                stage: PipelineStage.INITIALIZE,
                order: 1,
                enabled: true
            },

            {
                stage: PipelineStage.BACKUP,
                order: 2,
                enabled: true
            },

            {
                stage: PipelineStage.VERSION_DETECTION,
                order: 3,
                enabled: true
            },

            {
                stage: PipelineStage.PACKAGE_UPDATE,
                order: 4,
                enabled: true
            },

            {
                stage: PipelineStage.CLI_UPDATE,
                order: 5,
                enabled: true
            },

            {
                stage: PipelineStage.RULE_ENGINE,
                order: 6,
                enabled: true
            },

            {
                stage: PipelineStage.BUILD,
                order: 7,
                enabled: true
            },

            {
                stage: PipelineStage.REPORT,
                order: 8,
                enabled: true
            },

            {
                stage: PipelineStage.FINISHED,
                order: 9,
                enabled: true
            }

        ];

    }

}