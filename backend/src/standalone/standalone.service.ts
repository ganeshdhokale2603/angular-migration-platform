import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as fg from 'fast-glob';
import * as ts from 'typescript';

import { StandaloneTransformer } from './standalone.transformer';

import { StandaloneResult } from './models/standalone-result.model';
import { StandaloneCandidate } from './models/standalone-candidate.model';
import { StandaloneMigrationResult } from './models/standalone-migration-result.model';
import { NgModuleCleanupService } from 'src/code-migration/standalone/ng-module-cleanup.service';


@Injectable()
export class StandaloneService {

    private readonly transformer =
        new StandaloneTransformer();

    constructor(
        private readonly ngModuleCleanup:
            NgModuleCleanupService
    ) {}

    /**
     * ---------------------------------------------------------
     * SOURCE LEVEL MIGRATION
     * ---------------------------------------------------------
     *
     * This method is used by CodeMigrationService.
     *
     * IMPORTANT:
     * It must return a string.
     */
    migrate(source: string): string {

        return this.transformer.transform(
            source
        );

    }

    /**
     * ---------------------------------------------------------
     * PART 1
     * ANALYZE PROJECT
     * ---------------------------------------------------------
     */
    async analyze(
        projectPath: string
    ): Promise<StandaloneResult> {

        const candidates:
            StandaloneCandidate[] = [];

        const moduleFiles =
            await fg(
                ['**/*.module.ts'],
                {
                    cwd: projectPath,
                    absolute: true,

                    ignore: [
                        '**/node_modules/**',
                        '**/dist/**'
                    ]
                }
            );

        for (const file of moduleFiles) {

            const content =
                await fs.readFile(
                    file,
                    'utf8'
                );

            const declarationsMatch =
                content.match(
                    /declarations\s*:\s*\[([\s\S]*?)\]/m
                );

            if (!declarationsMatch) {
                continue;
            }

            const components =
                declarationsMatch[1]
                    .split(',')
                    .map(
                        component =>
                            component.trim()
                    )
                    .filter(Boolean);

            for (
                const component
                of components
            ) {

                candidates.push({

                    component,

                    module: file,

                    file

                });

            }

        }

        return {

            totalModules:
                moduleFiles.length,

            totalComponents:
                candidates.length,

            candidates

        };

    }

    /**
     * ---------------------------------------------------------
     * PROJECT MIGRATION
     * ---------------------------------------------------------
     *
     * This method is used by:
     *
     * POST /standalone/migrate
     *
     */
    async migrateProject(
        projectPath: string
    ): Promise<StandaloneMigrationResult> {

        /*
         * Files that were actually changed.
         */
        const modifiedFiles:
            string[] = [];

        /*
         * Names of components converted
         * to standalone.
         *
         * IMPORTANT:
         * This variable MUST be inside migrateProject().
         */
        const convertedComponents:
            string[] = [];

        /*
         * Number of converted components.
         */
        let componentsConverted = 0;

        /*
         * -----------------------------------------------------
         * STEP 1
         * Find component files
         * -----------------------------------------------------
         */

        const componentFiles =
            await fg(
                ['**/*.component.ts'],
                {
                    cwd: projectPath,
                    absolute: true,

                    ignore: [
                        '**/node_modules/**',
                        '**/dist/**'
                    ]
                }
            );

        /*
         * -----------------------------------------------------
         * STEP 2
         * Convert components
         * -----------------------------------------------------
         */

        for (
            const file
            of componentFiles
        ) {

            const original =
                await fs.readFile(
                    file,
                    'utf8'
                );

            /*
             * Existing standalone migration.
             */
            let transformed =
                this.migrate(
                    original
                );

            /*
             * Detect template dependencies.
             */
            const templateImports =
                await this.detectTemplateImports(
                    file,
                    original
                );

            /*
             * Add detected imports.
             */
            if (
                templateImports.length > 0
            ) {

                transformed =
                    this.transformer.addImports(
                        transformed,
                        templateImports
                    );

            }

            /*
             * Only write when source changed.
             */
            if (
                transformed !== original
            ) {

                await fs.writeFile(
                    file,
                    transformed,
                    'utf8'
                );

                modifiedFiles.push(
                    file
                );

                componentsConverted++;

                /*
                 * Extract class name.
                 *
                 * Example:
                 *
                 * export class HomeComponent {}
                 *
                 * becomes:
                 *
                 * HomeComponent
                 */
                const componentName =
                    this.extractComponentClassName(
                        transformed
                    );

                if (componentName) {

                    convertedComponents.push(
                        componentName
                    );

                }

            }

        }

        /*
         * -----------------------------------------------------
         * STEP 3
         * Find Angular modules
         * -----------------------------------------------------
         *
         * IMPORTANT:
         * moduleFiles is declared BEFORE it is used
         * in the return statement.
         */
        const moduleFiles =
            await fg(
                ['**/*.module.ts'],
                {
                    cwd: projectPath,
                    absolute: true,

                    ignore: [
                        '**/node_modules/**',
                        '**/dist/**'
                    ]
                }
            );

        /*
         * Number of modules modified.
         *
         * IMPORTANT:
         * modulesModified is declared BEFORE the loop
         * and BEFORE the return statement.
         */
        let modulesModified = 0;

        /*
         * -----------------------------------------------------
         * STEP 4
         * Remove standalone components from
         * NgModule declarations
         * -----------------------------------------------------
         */

        for (
            const moduleFile
            of moduleFiles
        ) {

            /*
             * If there are no converted components,
             * there is nothing to clean.
             */
            if (
                convertedComponents.length === 0
            ) {

                break;

            }

            const modified =
                await this.ngModuleCleanup.cleanup(
                    moduleFile,
                    convertedComponents
                );

            if (modified) {

                modulesModified++;

                /*
                 * Add module to changed files.
                 *
                 * Avoid duplicates.
                 */
                if (
                    !modifiedFiles.includes(
                        moduleFile
                    )
                ) {

                    modifiedFiles.push(
                        moduleFile
                    );

                }

            }

        }

        /*
         * -----------------------------------------------------
         * STEP 5
         * Build final result
         * -----------------------------------------------------
         */

        const migrationChanged =
            modifiedFiles.length > 0 ||
            modulesModified > 0;

        return {

            success: true,

            project:
                projectPath,

            filesScanned:
                componentFiles.length,

            filesModified:
                modifiedFiles.length,

            componentsConverted:
                componentsConverted,

            modulesScanned:
                moduleFiles.length,

            modulesModified:
                modulesModified,

            files:
                modifiedFiles,

            message:
                migrationChanged

                    ? 'Standalone component migration and NgModule cleanup completed.'

                    : 'No migration changes required.'

        };

    }

    /**
     * ---------------------------------------------------------
     * TEMPLATE IMPORT DETECTION
     * ---------------------------------------------------------
     */
private async detectTemplateImports(
    componentFile: string,
    source: string
): Promise<string[]> {

    const imports = new Set<string>();

    const checkTemplate = (template: string) => {

        // ---------------------------------------------
        // CommonModule
        // ---------------------------------------------

        if (
            template.includes('*ngIf') ||
            template.includes('*ngFor') ||
            template.includes('[ngClass]') ||
            template.includes('[ngStyle]') ||
            template.includes('ngSwitch') ||
            template.includes('ngTemplateOutlet') ||
            template.includes('| date') ||
            template.includes('|date') ||
            template.includes('| async') ||
            template.includes('|async')
        ) {

            imports.add('CommonModule');

        }


        // ---------------------------------------------
        // RouterModule
        // ---------------------------------------------

        if (
            template.includes('[routerLink]') ||
            template.includes('routerLink=') ||
            template.includes('(routerLink)') ||
            template.includes('routerLinkActive')
        ) {

            imports.add('RouterModule');

        }


        // ---------------------------------------------
        // FormsModule
        // ---------------------------------------------

        if (
            template.includes('[(ngModel)]') ||
            template.includes('ngModel')
        ) {

            imports.add('FormsModule');

        }


        // ---------------------------------------------
        // ReactiveFormsModule
        // ---------------------------------------------

        if (
            template.includes('formGroup') ||
            template.includes('formControl') ||
            template.includes('formControlName') ||
            template.includes('formArrayName') ||
            template.includes('formGroupName')
        ) {

            imports.add('ReactiveFormsModule');

        }


        // ---------------------------------------------
        // Angular Material - Spinner
        // ---------------------------------------------

        if (
            template.includes('<mat-spinner') ||
            template.includes('<mat-progress-spinner')
        ) {

            imports.add(
                'MatProgressSpinnerModule'
            );

        }

    };


    // ---------------------------------------------
    // Inline template
    // ---------------------------------------------

    checkTemplate(source);


    // ---------------------------------------------
    // External template
    // ---------------------------------------------

    const templateMatch =
        source.match(
            /templateUrl\s*:\s*['"]([^'"]+)['"]/
        );

    if (templateMatch) {

        const templatePath =
            path.resolve(
                path.dirname(componentFile),
                templateMatch[1]
            );

        if (
            await fs.pathExists(templatePath)
        ) {

            const template =
                await fs.readFile(
                    templatePath,
                    'utf8'
                );

            checkTemplate(template);

        }

    }

    return [
        ...imports
    ];
}

    /**
     * ---------------------------------------------------------
     * EXTRACT COMPONENT CLASS NAME
     * ---------------------------------------------------------
     */
    private extractComponentClassName(
        source: string
    ): string | null {

        const sourceFile =
            ts.createSourceFile(
                'component.ts',
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

        let componentName:
            string | null = null;

        sourceFile.forEachChild(
            node => {

                if (
                    ts.isClassDeclaration(
                        node
                    ) &&
                    node.name
                ) {

                    componentName =
                        node.name.text;

                }

            }
        );

        return componentName;

    }

}