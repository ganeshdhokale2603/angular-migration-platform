import { Injectable } from '@nestjs/common';

import {
    AngularTemplateMigrationRule
} from './angular-template-rule.model';

@Injectable()
export class AngularTemplateRuleService {

    private readonly rules:
        AngularTemplateMigrationRule[] = [

        {
            id: 'NGIF_TO_IF',

            type: 'STRUCTURAL_DIRECTIVE',

            sourceSyntax: '*ngIf="condition"',

            targetSyntax: '@if (condition) { ... }',

            description:
                'Migrates the legacy ngIf structural directive to Angular control flow syntax.',

            automated: true
        },

        {
            id: 'NGFOR_TO_FOR',

            type: 'STRUCTURAL_DIRECTIVE',

            sourceSyntax:
                '*ngFor="let item of items"',

            targetSyntax:
                '@for (item of items; track item) { ... }',

            description:
                'Migrates the legacy ngFor structural directive to Angular control flow syntax.',

            automated: true
        },

        {
            id: 'NGSWITCH_TO_SWITCH',

            type: 'STRUCTURAL_DIRECTIVE',

            sourceSyntax:
                '[ngSwitch]="value"',

            targetSyntax:
                '@switch (value) { ... }',

            description:
                'Migrates legacy ngSwitch syntax to Angular control flow syntax.',

            automated: true
        },

        {
            id: 'NGCLASS_REVIEW',

            type: 'PROPERTY_BINDING',

            sourceSyntax:
                '[ngClass]="expression"',

            targetSyntax:
                '[class]="expression"',

            description:
                'Identifies ngClass bindings for migration review. Transformation depends on the expression.',

            automated: false
        },

        {
            id: 'NGSTYLE_REVIEW',

            type: 'PROPERTY_BINDING',

            sourceSyntax:
                '[ngStyle]="expression"',

            targetSyntax:
                '[style]="expression"',

            description:
                'Identifies ngStyle bindings for migration review.',

            automated: false
        }

    ];


    getRules():
        AngularTemplateMigrationRule[] {

        return [
            ...this.rules
        ];

    }


    getRule(
        ruleId: string
    ):
        AngularTemplateMigrationRule | undefined {

        return this.rules.find(
            rule =>
                rule.id === ruleId
        );

    }


    getRulesByType(
        type:
            AngularTemplateMigrationRule['type']
    ):
        AngularTemplateMigrationRule[] {

        return this.rules.filter(
            rule =>
                rule.type === type
        );

    }


    getAutomatedRules():
        AngularTemplateMigrationRule[] {

        return this.rules.filter(
            rule =>
                rule.automated
        );

    }


    findRuleForDirective(
        directive: string
    ):
        AngularTemplateMigrationRule | undefined {

        const normalizedDirective =
            directive.startsWith('*')
                ? directive.substring(1)
                : directive;

        switch (
            normalizedDirective
        ) {

            case 'ngIf':

                return this.getRule(
                    'NGIF_TO_IF'
                );

            case 'ngFor':

                return this.getRule(
                    'NGFOR_TO_FOR'
                );

            default:

                return undefined;

        }

    }


    hasRule(
        ruleId: string
    ): boolean {

        return this.rules.some(
            rule =>
                rule.id === ruleId
        );

    }

}