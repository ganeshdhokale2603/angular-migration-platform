export interface MigrationEngineEvent {

    type: string;

    timestamp: Date;

    executionId: string;

    stage?: string;

    message: string;

}