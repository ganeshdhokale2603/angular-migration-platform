export interface ExecutionMetrics {

    startedAt: Date;

    completedAt?: Date;

    elapsedTime: number;

    estimatedRemaining: number;

    successfulStages: number;

    failedStages: number;

}