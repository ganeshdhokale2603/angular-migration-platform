import { RuleRecommendation } from './rule-recommendation.model';
import { RuleExecutionResult } from './rule-execution-result.model';

export interface RulePipelineResult {

    success: boolean;

    project: string;

    angularVersion: number;

    recommendedRules: RuleRecommendation[];

    execution: RuleExecutionResult;

    duration: number;

}