import { RuleExecution } from './rule-execution.model';

export interface MigrationResult {

    success: boolean;

    project: string;

    sourceVersion: number;

    targetVersion: number;

    startedAt: Date;

    completedAt: Date;

    durationSeconds: number;

    executedRules: RuleExecution[];

    totalRules: number;

    successfulRules: number;

    failedRules: number;

    skippedRules: number;

    reportPath?: string;

    logPath?: string;

}