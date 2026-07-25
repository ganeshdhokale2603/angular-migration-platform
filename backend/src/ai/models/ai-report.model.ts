import { Recommendation } from './recommendation.model';
import { MigrationRisk } from './migration-risk.model';
import { MigrationScore } from './migration-score.model';

export interface AiReport {

    projectName: string;

    angularVersion: number;

    targetVersion: number;

    score: MigrationScore;

    risk: MigrationRisk;

    recommendations: Recommendation[];

    estimatedHours: number;

}