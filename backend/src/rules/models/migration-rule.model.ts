import { RuleAction } from './rule-action.model';
import { RuleCondition } from './rule-condition.model';
import { RuleSeverity } from './rule-severity.enum';
import { RuleType } from './rule-type.enum';

export interface MigrationRule {

    id: string;

    name: string;

    description: string;

    type: RuleType;

    severity: RuleSeverity;

    condition: RuleCondition;

    action: RuleAction;

}