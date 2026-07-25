import { Injectable } from '@nestjs/common';

import { FixSuggestion } from '../models/fix-suggestion.model';

@Injectable()
export class FixSuggestionService {

    generate(

        analysis: any

    ): FixSuggestion[] {

        const suggestions: FixSuggestion[] = [];

        if (analysis.angularVersion < 15) {

            suggestions.push({

                title: 'Upgrade Angular',

                description:
                    'Upgrade project to Angular 20 before applying modern features.',

                priority: 'HIGH',

                category: 'Framework'

            });

        }

        if (analysis.totalModules > 0) {

            suggestions.push({

                title: 'Standalone Components',

                description:
                    'Convert NgModule based components into standalone components.',

                priority: 'HIGH',

                category: 'Architecture'

            });

        }

        if (analysis.totalServices > 0) {

            suggestions.push({

                title: 'inject() Function',

                description:
                    'Replace constructor dependency injection with inject().',

                priority: 'MEDIUM',

                category: 'Dependency Injection'

            });

        }

        if (analysis.totalComponents > 0) {

            suggestions.push({

                title: 'Control Flow Syntax',

                description:
                    'Replace *ngIf and *ngFor with @if and @for.',

                priority: 'MEDIUM',

                category: 'Templates'

            });

        }

        if (analysis.rxjsVersion?.startsWith('6')) {

            suggestions.push({

                title: 'Modernize RxJS',

                description:
                    'Replace deprecated RxJS operators and APIs.',

                priority: 'LOW',

                category: 'RxJS'

            });

        }

        return suggestions;

    }

}