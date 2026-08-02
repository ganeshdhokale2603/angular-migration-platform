export interface MigrationPhase {

    phase: string;

    description: string;

    estimatedMinutes: number;

    rules: string[];

}