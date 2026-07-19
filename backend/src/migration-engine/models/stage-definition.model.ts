import { PipelineStage } from './pipeline-stage';

export interface StageDefinition {

    stage: PipelineStage;

    order: number;

    enabled: boolean;

}