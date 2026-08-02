import { RuleRisk } from './rule-risk.model';
import { RulePriority } from './rule-priority.model';
import { MigrationPhase } from './migration-phase.model';
import { MigrationRecommendation } from './migration-recommendation.model';

export interface MigrationPlan {

    project: string;

    sourceVersion: number;

    targetVersion: number;

    estimatedComplexity: 'LOW' | 'MEDIUM' | 'HIGH';

    overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';

    estimatedDuration: string;

    recommendedStrategy: string;

    recommendedRules: string[];
    rulePriority: RulePriority[];

    ruleRisks: RuleRisk[];
    executionPhases: MigrationPhase[];

totalEstimatedMinutes: number;
recommendations: MigrationRecommendation[];

preMigrationChecklist: string[];

postMigrationChecklist: string[];

    warnings: string[];

}