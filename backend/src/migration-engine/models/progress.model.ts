import { PipelineStage } from './pipeline-stage';

export interface ProgressModel {

    percentage: number;

    currentStage: PipelineStage;

    currentStageName: string;

    completedStages: number;

    totalStages: number;

    status: string;

}