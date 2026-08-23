export type AngularTemplateNodeType =
    | 'ELEMENT'
    | 'TEXT'
    | 'INTERPOLATION'
    | 'STRUCTURAL_DIRECTIVE'
    | 'PROPERTY_BINDING'
    | 'EVENT_BINDING'
    | 'ATTRIBUTE'
    | 'TEMPLATE_REFERENCE';

export interface AngularTemplateNode {
    type: AngularTemplateNodeType;

    /**
     * HTML element name.
     *
     * Example:
     * div
     * button
     * input
     */
    element?: string;

    /**
     * Original template expression.
     *
     * Example:
     * {{ question.title }}
     * let answer of answers
     */
    expression?: string;

    /**
     * Angular directive/binding name.
     *
     * Examples:
     * ngIf
     * ngFor
     * ngModel
     * click
     */
    name?: string;

    /**
     * Binding value.
     *
     * Examples:
     * isBusy
     * answer.body
     * onClick()
     */
    value?: string;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;
}