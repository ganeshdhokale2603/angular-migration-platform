export type AngularTemplateRuleType =
    | 'STRUCTURAL_DIRECTIVE'
    | 'INTERPOLATION'
    | 'PROPERTY_BINDING'
    | 'EVENT_BINDING';

export interface AngularTemplateMigrationRule {

    /**
     * Rule identifier.
     */
    id: string;

    /**
     * Rule category.
     */
    type: AngularTemplateRuleType;

    /**
     * Legacy Angular syntax.
     */
    sourceSyntax: string;

    /**
     * Modern Angular syntax.
     */
    targetSyntax: string;

    /**
     * Short explanation of the migration.
     */
    description: string;

    /**
     * Whether this rule is currently supported
     * by the automatic migration engine.
     */
    automated: boolean;
}