import { MigrationStep } from './migration-step.model';

export interface MigrationPlan {

    projectName: string;

    currentVersion: number;

    targetVersion: number;

    totalSteps: number;

    steps: MigrationStep[];

}