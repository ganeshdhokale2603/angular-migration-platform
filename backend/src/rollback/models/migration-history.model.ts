export interface MigrationHistory {

    id: string;

    project: string;

    migratedAt: Date;

    status: 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';

    checkpointId: string;

}