import { AIRecommendation } from '../../ai-advisor/ai.recommendation';

export interface DashboardAIModel {

    projectRisk: 'LOW' | 'MEDIUM' | 'HIGH';

    confidenceScore: number;

    riskScore: number;

    riskFactors: string[];

    recommendations: AIRecommendation[];

}