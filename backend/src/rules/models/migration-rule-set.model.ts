import { MigrationRule } from './migration-rule.model';

export interface MigrationRuleSet {

    version: number;

    rules: MigrationRule[];

}