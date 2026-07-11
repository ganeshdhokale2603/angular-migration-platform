export interface MigrationHistory {

    id: number;

    projectName: string;

    executedAt: Date;

    status: 'SUCCESS' | 'FAILED' | 'PARTIAL';

    duration: number;

}