import { AIRecommendation } from './ai.recommendation';

export interface AIReport {

  projectRisk: 'LOW' | 'MEDIUM' | 'HIGH';

  confidenceScore: number;

  riskScore: number;

  riskFactors: string[];

  recommendations: AIRecommendation[];

  llmSummary: string;

  migrationStrategy: string;

  llmRecommendations: string[];

}