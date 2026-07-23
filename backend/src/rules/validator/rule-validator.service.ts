import { Injectable } from '@nestjs/common';

import { MigrationRuleSet } from '../models/migration-rule-set.model';
import { MigrationRule } from '../models/migration-rule.model';

@Injectable()
export class RuleValidatorService {

    validate(ruleSet: MigrationRuleSet): string[] {

        const errors: string[] = [];

        const ids = new Set<string>();

        for (const rule of ruleSet.rules) {

            this.validateRule(rule, errors, ids);

        }

        return errors;

    }

    private validateRule(

        rule: MigrationRule,

        errors: string[],

        ids: Set<string>

    ): void {

        if (!rule.id) {

            errors.push('Rule id is required.');

        }

        if (!rule.name) {

            errors.push(`Rule ${rule.id}: name is required.`);

        }

        if (ids.has(rule.id)) {

            errors.push(`Duplicate rule id: ${rule.id}`);

        }

        ids.add(rule.id);

        if (

            rule.condition.angularFrom >

            rule.condition.angularTo

        ) {

            errors.push(

                `Rule ${rule.id}: invalid Angular version range.`

            );

        }

        if (!rule.action.enabled) {

            errors.push(

                `Rule ${rule.id}: action is disabled.`

            );

        }

        if (!rule.action.transformer) {

            errors.push(

                `Rule ${rule.id}: transformer missing.`

            );

        }

    }

}