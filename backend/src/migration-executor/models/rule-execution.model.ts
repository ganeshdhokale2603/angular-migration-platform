export interface RuleExecution {

    ruleId: string;

    ruleName: string;

    status:
        | 'SUCCESS'
        | 'FAILED'
        | 'SKIPPED';

    duration: number;

    message?: string;

}