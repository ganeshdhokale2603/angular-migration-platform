export interface MigrationStep {

    id:number;

    title:string;

    description:string;

    status:'PENDING' | 'COMPLETED';

    automated:boolean;

}