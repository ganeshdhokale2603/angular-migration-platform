export interface MigrationStep{

id:number;

title:string;

description:string;

status:string;

automated:boolean;

}

export interface MigrationPlan{

totalSteps:number;

estimatedTime:string;

steps:MigrationStep[];

}