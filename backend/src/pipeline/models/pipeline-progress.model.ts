export interface PipelineProgress {

    currentStep: string;

    completedSteps: number;

    totalSteps: number;

    percentage: number;

    status:
        | 'RUNNING'
        | 'COMPLETED'
        | 'FAILED';

}