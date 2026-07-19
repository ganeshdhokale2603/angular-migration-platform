import { ExecutionState } from './execution-state';
import { PipelineStage } from './pipeline-stage';
import { ProgressModel } from './progress.model';
import { ProjectInfo } from './project-info.model';
import { MigrationOptions } from './migration-options.model';
import { ExecutionMetrics } from './execution-metrics.model';
import { MigrationPlan } from '../planner/models/migration-plan.model';

export interface ExecutionContext {

    executionId: string;

    projectPath: string;

    targetVersion: number;
    project: ProjectInfo;

options: MigrationOptions;

    state: ExecutionState;

    currentStage: PipelineStage;

    completedStages: PipelineStage[];

    progress: ProgressModel;

    logs: string[];

    warnings: string[];

    errors: string[];

    metrics: ExecutionMetrics;

    plan?: MigrationPlan;

}