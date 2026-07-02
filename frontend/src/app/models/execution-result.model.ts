import { ExecutionLog } from "./execution-log.model";

export interface ExecutionResult{

    completedSteps:number;

    failedSteps:number;

    executionTime:number;

    logs:ExecutionLog[];

}