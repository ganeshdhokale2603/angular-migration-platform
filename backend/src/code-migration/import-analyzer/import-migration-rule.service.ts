import { Injectable } from '@nestjs/common';

import {
    ImportMigrationRule
} from './models/import-migration-rule.model';

@Injectable()
export class ImportMigrationRuleService {

    analyze(
        module: string,
        importName: string
    ): ImportMigrationRule {

        /*
         * Angular Core
         */

        if (module === '@angular/core') {

            switch (importName) {

                case 'Component':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Component remains supported in modern Angular.'
                    };

                case 'Injectable':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Injectable remains supported in modern Angular.'
                    };

                case 'OnInit':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'OnInit lifecycle interface remains supported.'
                    };

                case 'OnDestroy':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'OnDestroy lifecycle interface remains supported.'
                    };

                case 'Input':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Input remains supported in modern Angular.'
                    };

                case 'Output':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Output remains supported in modern Angular.'
                    };

                case 'EventEmitter':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'EventEmitter remains supported in modern Angular.'
                    };

                case 'ViewChild':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'ViewChild remains supported in modern Angular.'
                    };

                case 'ViewChildren':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'ViewChildren remains supported in modern Angular.'
                    };

                case 'AfterViewInit':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'AfterViewInit remains supported in modern Angular.'
                    };

                case 'AfterViewChecked':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'AfterViewChecked remains supported in modern Angular.'
                    };

                case 'NgModule':

                    return {
                        module,
                        importName,
                        action: 'REVIEW',
                        risk: 'MEDIUM',
                        reason:
                            'NgModule usage should be reviewed when migrating toward standalone architecture.'
                    };

                case 'inject':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'inject() provides a modern dependency injection pattern.'
                    };

                case 'signal':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'Signals provide a modern reactive state management approach.'
                    };

                case 'computed':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'computed() can be used for derived reactive state.'
                    };

                case 'effect':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'effect() can be used for reactive side effects.'
                    };

                default:

                    return {
                        module,
                        importName,
                        action: 'REVIEW',
                        risk: 'LOW',
                        reason:
                            'Angular core import requires compatibility review.'
                    };
            }
        }


        /*
         * Angular Common
         */

        if (module === '@angular/common') {

            switch (importName) {

                case 'CommonModule':

                    return {
                        module,
                        importName,
                        action: 'REVIEW',
                        risk: 'MEDIUM',
                        reason:
                            'CommonModule usage should be reviewed during standalone migration.'
                    };

                case 'NgIf':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'NgIf can be replaced with Angular modern control flow where appropriate.',
                        replacement:
                            '@if'
                    };

                case 'NgFor':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'NgFor can be replaced with Angular modern control flow where appropriate.',
                        replacement:
                            '@for'
                    };

                case 'NgSwitch':

                    return {
                        module,
                        importName,
                        action: 'MODERNIZE',
                        risk: 'LOW',
                        reason:
                            'NgSwitch can be replaced with modern Angular control flow where appropriate.',
                        replacement:
                            '@switch'
                    };

                default:

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Angular common import is generally supported.'
                    };
            }
        }


        /*
         * Angular Router
         */

        if (module === '@angular/router') {

            switch (importName) {

                case 'Router':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Router remains supported in modern Angular.'
                    };

                case 'ActivatedRoute':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'ActivatedRoute remains supported in modern Angular.'
                    };

                case 'RouterLink':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'RouterLink remains supported in modern Angular.'
                    };

                case 'RouterOutlet':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'RouterOutlet remains supported in modern Angular.'
                    };

                default:

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Angular Router API remains supported.'
                    };
            }
        }


        /*
         * Angular HTTP
         */

        if (module === '@angular/http') {

            return {
                module,
                importName,
                action: 'REPLACE',
                risk: 'HIGH',
                replacement:
                    '@angular/common/http',
                reason:
                    '@angular/http is deprecated and should be replaced with @angular/common/http.'
            };
        }


        /*
         * Angular Forms
         */

        if (module === '@angular/forms') {

            switch (importName) {

                case 'FormsModule':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'FormsModule remains supported.'
                    };

                case 'ReactiveFormsModule':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'ReactiveFormsModule remains supported.'
                    };

                case 'FormBuilder':

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'FormBuilder remains supported.'
                    };

                default:

                    return {
                        module,
                        importName,
                        action: 'KEEP',
                        risk: 'LOW',
                        reason:
                            'Angular Forms API remains supported.'
                    };
            }
        }


        /*
         * Generic Angular package
         */

        if (module.startsWith('@angular/')) {

            return {
                module,
                importName,
                action: 'REVIEW',
                risk: 'MEDIUM',
                reason:
                    'Angular package should be reviewed for target-version compatibility.'
            };
        }


        /*
         * Third-party dependency
         */

        return {
            module,
            importName,
            action: 'REVIEW',
            risk: 'LOW',
            reason:
                'Third-party dependency should be checked for target Angular compatibility.'
        };
    }
}