export interface RiskReport {

    overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';

    riskScore: number;

    confidenceScore: number;

    riskFactors: string[];

}