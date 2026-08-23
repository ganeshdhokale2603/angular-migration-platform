import { Injectable } from '@nestjs/common';

import {
    AngularTemplateNode
} from './models/angular-template-node.model';

@Injectable()
export class AngularTemplateAnalyzerService {

    analyze(
        source: string
    ): AngularTemplateNode[] {

        const nodes: AngularTemplateNode[] = [];

        if (!source || !source.trim()) {
            return nodes;
        }

        /*
         * ---------------------------------------------------------
         * Structural directives
         * ---------------------------------------------------------
         *
         * Examples:
         *
         * *ngIf="isBusy"
         * *ngFor="let answer of answers"
         */

        const structuralDirectiveRegex =
            /\*([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g;

        let structuralMatch:
            RegExpExecArray | null;

        while (
            (structuralMatch =
                structuralDirectiveRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'STRUCTURAL_DIRECTIVE',

                name: structuralMatch[1],

                expression: structuralMatch[2],

                value: structuralMatch[2],

                metadata: {
                    syntax: `*${structuralMatch[1]}`
                }

            });

        }


        /*
         * ---------------------------------------------------------
         * Interpolation
         * ---------------------------------------------------------
         *
         * Example:
         *
         * {{ question.title }}
         */

        const interpolationRegex =
            /\{\{\s*([\s\S]*?)\s*\}\}/g;

        let interpolationMatch:
            RegExpExecArray | null;

        while (
            (interpolationMatch =
                interpolationRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'INTERPOLATION',

                expression:
                    interpolationMatch[1].trim(),

                value:
                    interpolationMatch[1].trim()

            });

        }


        /*
         * ---------------------------------------------------------
         * Property bindings
         * ---------------------------------------------------------
         *
         * Examples:
         *
         * [disabled]="isBusy"
         * [routerLink]="link"
         * [innerHtml]="question.body"
         */

        const propertyBindingRegex =
            /\[([a-zA-Z0-9_.-]+)\]\s*=\s*"([^"]*)"/g;

        let propertyMatch:
            RegExpExecArray | null;

        while (
            (propertyMatch =
                propertyBindingRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'PROPERTY_BINDING',

                name:
                    propertyMatch[1],

                expression:
                    propertyMatch[2],

                value:
                    propertyMatch[2]

            });

        }


        /*
         * ---------------------------------------------------------
         * Event bindings
         * ---------------------------------------------------------
         *
         * Examples:
         *
         * (click)="save()"
         * (change)="onChange($event)"
         */

        const eventBindingRegex =
            /\(([a-zA-Z0-9_.:-]+)\)\s*=\s*"([^"]*)"/g;

        let eventMatch:
            RegExpExecArray | null;

        while (
            (eventMatch =
                eventBindingRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'EVENT_BINDING',

                name:
                    eventMatch[1],

                expression:
                    eventMatch[2],

                value:
                    eventMatch[2]

            });

        }


        /*
         * ---------------------------------------------------------
         * Template references
         * ---------------------------------------------------------
         *
         * Example:
         *
         * #myInput
         */

        const templateReferenceRegex =
            /#([a-zA-Z0-9_-]+)/g;

        let referenceMatch:
            RegExpExecArray | null;

        while (
            (referenceMatch =
                templateReferenceRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'TEMPLATE_REFERENCE',

                name:
                    referenceMatch[1]

            });

        }


        /*
         * ---------------------------------------------------------
         * HTML elements
         * ---------------------------------------------------------
         *
         * Example:
         *
         * <div>
         * <button>
         * <input>
         */

        const elementRegex =
            /<([a-zA-Z][a-zA-Z0-9-]*)\b/g;

        let elementMatch:
            RegExpExecArray | null;

        while (
            (elementMatch =
                elementRegex.exec(source)) !== null
        ) {

            nodes.push({

                type: 'ELEMENT',

                element:
                    elementMatch[1]

            });

        }


        return nodes;
    }


    getStructuralDirectives(
        source: string
    ): AngularTemplateNode[] {

        return this.analyze(source)
            .filter(
                node =>
                    node.type ===
                    'STRUCTURAL_DIRECTIVE'
            );
    }


    getInterpolations(
        source: string
    ): AngularTemplateNode[] {

        return this.analyze(source)
            .filter(
                node =>
                    node.type ===
                    'INTERPOLATION'
            );
    }


    getPropertyBindings(
        source: string
    ): AngularTemplateNode[] {

        return this.analyze(source)
            .filter(
                node =>
                    node.type ===
                    'PROPERTY_BINDING'
            );
    }


    getEventBindings(
        source: string
    ): AngularTemplateNode[] {

        return this.analyze(source)
            .filter(
                node =>
                    node.type ===
                    'EVENT_BINDING'
            );
    }


    getTemplateReferences(
        source: string
    ): AngularTemplateNode[] {

        return this.analyze(source)
            .filter(
                node =>
                    node.type ===
                    'TEMPLATE_REFERENCE'
            );
    }


    hasStructuralDirective(
        source: string,
        directive: string
    ): boolean {

        return this.getStructuralDirectives(source)
            .some(
                node =>
                    node.name === directive
            );
    }
}