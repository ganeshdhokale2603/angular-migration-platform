import { ExecutionLog } from "./execution-log";

export interface ExecutionResult {

  completedSteps: number;

  failedSteps: number;

  executionTime: number;

  logs: ExecutionLog[];

}