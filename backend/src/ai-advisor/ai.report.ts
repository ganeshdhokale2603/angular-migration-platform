import { AIRecommendation } from './ai.recommendation';
import { RiskReport } from './risk.report';

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