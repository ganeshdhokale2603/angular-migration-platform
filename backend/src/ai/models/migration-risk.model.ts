export interface MigrationRisk {

    level: 'Low' | 'Medium' | 'High';

    score: number;

    reasons: string[];

}