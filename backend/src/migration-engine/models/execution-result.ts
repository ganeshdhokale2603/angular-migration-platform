import { ExecutionState } from './execution-state';
import { ProgressModel } from './progress.model';

export interface ExecutionResult {

    executionId: string;

    success: boolean;

    state: ExecutionState;

    progress: ProgressModel;

    duration: number;

    successfulStages: number;

    failedStages: number;

    message: string;

}