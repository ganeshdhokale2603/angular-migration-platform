export interface MigrationStep {

    id:number;

    title:string;

    description:string;

    status:MigrationStatus;

    automated:boolean;

}

export type MigrationStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED';