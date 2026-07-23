import { Injectable } from '@nestjs/common';

import { MigrationRuleSet } from '../models/migration-rule-set.model';
import { RulesService } from '../rules.service';

@Injectable()
export class RuleRegistryService {

    private readonly registry = new Map<number, MigrationRuleSet>();

    constructor(

        private readonly rulesService: RulesService

    ) {}

    async get(version: number): Promise<MigrationRuleSet> {

        if (!this.registry.has(version)) {

            const rules =

                await this.rulesService.loadRules(version);

            this.registry.set(version, rules);

        }

        return this.registry.get(version)!;

    }

    async reload(version: number): Promise<MigrationRuleSet> {

        const rules =

            await this.rulesService.loadRules(version);

        this.registry.set(version, rules);

        return rules;

    }

    clear(): void {

        this.registry.clear();

    }

    contains(version: number): boolean {

        return this.registry.has(version);

    }

    versions(): number[] {

        return [...this.registry.keys()];

    }

    size(): number {

        return this.registry.size;

    }
    async getRules(version: number) {

    const ruleSet = await this.get(version);

    return ruleSet.rules;

}

}