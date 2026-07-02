import { MigrationStep } from './migration-step';

export interface MigrationPlan {

    totalSteps:number;

    estimatedTime:string;

    steps:MigrationStep[];

}