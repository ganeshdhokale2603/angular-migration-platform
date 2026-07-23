import { Injectable } from '@nestjs/common';

import { RuleLoaderService } from './loader/rule-loader.service';
import { RuleValidatorService } from './validator/rule-validator.service';

import { MigrationRuleSet } from './models/migration-rule-set.model';

@Injectable()
export class RulesService {

    constructor(

        private readonly loader: RuleLoaderService,

        private readonly validator: RuleValidatorService

    ) {}

    async loadRules(

        version: number

    ): Promise<MigrationRuleSet> {

        const rules =

            await this.loader.load(version);

        const errors =

            this.validator.validate(rules);

        if (errors.length > 0) {

            throw new Error(

                errors.join('\n')

            );

        }

        return rules;

    }

}