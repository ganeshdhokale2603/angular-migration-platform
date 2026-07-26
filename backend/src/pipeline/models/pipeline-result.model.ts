import { PipelineProgress } from './pipeline-progress.model';

export interface PipelineResult {

    success: boolean;

    project: string;

    targetVersion: number;

    completedSteps: number;

    totalSteps: number;

    message: string;

    progress: PipelineProgress;

    environment?: any;

    analysis?: any;

    aiAnalysis?: any;

    recommendations?: any;

    workspace?: any;

    backup?: any;

    checkpoint?: any;

}