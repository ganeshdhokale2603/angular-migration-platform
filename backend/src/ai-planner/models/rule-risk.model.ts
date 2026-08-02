export interface RuleRisk {

    rule: string;

    risk: 'LOW' | 'MEDIUM' | 'HIGH';

    reason: string;

}