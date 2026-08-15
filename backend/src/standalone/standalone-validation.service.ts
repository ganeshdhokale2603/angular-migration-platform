import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

import { exec } from 'child_process';
import { promisify } from 'util';

import {
    StandaloneValidationResult,
    StandaloneValidationCheck
} from './models/standalone-validation-result.model';

const execAsync = promisify(exec);

@Injectable()
export class StandaloneValidationService {

    async validate(
        projectPath: string
    ): Promise<StandaloneValidationResult> {

        const checks: StandaloneValidationCheck[] = [];

        const errors: string[] = [];

        const warnings: string[] = [];

        let filesScanned = 0;

        let standaloneComponents = 0;

        let nonStandaloneComponents = 0;

        let buildSuccessful = false;


        // ==================================================
        // 1. Project folder
        // ==================================================

        const projectExists =
            await fs.pathExists(projectPath);

        if (!projectExists) {

            checks.push({

                name: 'Project Folder',

                status: 'FAILED',

                message:
                    'Project folder does not exist.'

            });

            return {

                success: false,

                projectPath,

                buildSuccessful: false,

                filesScanned: 0,

                standaloneComponents: 0,

                nonStandaloneComponents: 0,

                errors: [
                    'Project folder does not exist.'
                ],

                warnings: [],

                checks,

                message:
                    'Standalone validation failed.'

            };

        }


        checks.push({

            name: 'Project Folder',

            status: 'PASSED',

            message:
                'Project folder found.'

        });


        // ==================================================
        // 2. package.json
        // ==================================================

        const packageFile =
            path.join(
                projectPath,
                'package.json'
            );

        const packageExists =
            await fs.pathExists(
                packageFile
            );

        if (packageExists) {

            checks.push({

                name: 'package.json',

                status: 'PASSED',

                message:
                    'package.json found.'

            });

        }
        else {

            checks.push({

                name: 'package.json',

                status: 'FAILED',

                message:
                    'package.json not found.'

            });

            errors.push(
                'package.json not found.'
            );

        }


        // ==================================================
        // 3. Find TypeScript files
        // ==================================================

        const tsFiles =
            await this.findTypeScriptFiles(
                projectPath
            );

        filesScanned =
            tsFiles.length;


        // ==================================================
        // 4. Analyze components
        // ==================================================

        for (
            const file of tsFiles
        ) {

            try {

                const source =
                    await fs.readFile(
                        file,
                        'utf8'
                    );


                if (
                    !source.includes(
                        '@Component'
                    )
                ) {

                    continue;

                }


                const relativeFile =
                    path.relative(
                        projectPath,
                        file
                    );


                const isStandalone =
                    this.isStandaloneComponent(
                        source
                    );


                if (isStandalone) {

                    standaloneComponents++;

                    checks.push({

                        name:
                            `Standalone: ${relativeFile}`,

                        status:
                            'PASSED',

                        message:
                            'Standalone component detected.'

                    });

                }
                else {

                    nonStandaloneComponents++;

                    warnings.push(

                        `${relativeFile} is not configured as standalone.`

                    );

                }


                // ------------------------------------------
                // Common Angular directives
                // ------------------------------------------

                if (
                    this.usesCommonAngularDirectives(
                        source
                    )
                ) {

                    const hasCommonModule =
                        source.includes(
                            'CommonModule'
                        );

                    if (!hasCommonModule) {

                        warnings.push(

                            `${relativeFile} uses common Angular directives but CommonModule was not detected.`

                        );

                    }

                }


                // ------------------------------------------
                // Router features
                // ------------------------------------------

                if (
                    this.usesRouterFeatures(
                        source
                    )
                ) {

                    const hasRouterImport =
                        source.includes(
                            'RouterModule'
                        ) ||
                        source.includes(
                            'RouterLink'
                        ) ||
                        source.includes(
                            'RouterOutlet'
                        );

                    if (!hasRouterImport) {

                        warnings.push(

                            `${relativeFile} uses router features but no router import was detected.`

                        );

                    }

                }


                // ------------------------------------------
                // Forms features
                // ------------------------------------------

                if (
                    this.usesFormsFeatures(
                        source
                    )
                ) {

                    const hasFormsImport =
                        source.includes(
                            'FormsModule'
                        ) ||
                        source.includes(
                            'ReactiveFormsModule'
                        ) ||
                        source.includes(
                            'NgModel'
                        ) ||
                        source.includes(
                            'FormControl'
                        );

                    if (!hasFormsImport) {

                        warnings.push(

                            `${relativeFile} uses form features but no forms import was detected.`

                        );

                    }

                }

            }
            catch (error) {

                errors.push(

                    `Unable to validate ${file}: ${
                        error instanceof Error
                            ? error.message
                            : 'Unknown error'
                    }`

                );

            }

        }


        // ==================================================
        // 5. Standalone component summary
        // ==================================================

        if (
            standaloneComponents > 0
        ) {

            checks.push({

                name:
                    'Standalone Components',

                status:
                    'PASSED',

                message:
                    `${standaloneComponents} standalone component(s) detected.`

            });

        }
        else {

            checks.push({

                name:
                    'Standalone Components',

                status:
                    'WARNING',

                message:
                    'No standalone components detected.'

            });

            warnings.push(
                'No standalone components were detected.'
            );

        }


        // ==================================================
        // 6. Non-standalone component summary
        // ==================================================

        if (
            nonStandaloneComponents > 0
        ) {

            checks.push({

                name:
                    'NgModule Components',

                status:
                    'WARNING',

                message:
                    `${nonStandaloneComponents} component(s) are still non-standalone.`

            });

        }
        else {

            checks.push({

                name:
                    'NgModule Components',

                status:
                    'PASSED',

                message:
                    'No non-standalone components detected.'

            });

        }


        // ==================================================
        // 7. Angular build
        // ==================================================

        try {

            await execAsync(

                'npm run build',

                {

                    cwd: projectPath,

                    timeout: 300000,

                    maxBuffer:
                        10 * 1024 * 1024

                }

            );

            buildSuccessful = true;

            checks.push({

                name:
                    'Angular Build',

                status:
                    'PASSED',

                message:
                    'Angular project builds successfully.'

            });

        }
        catch (error) {

            buildSuccessful = false;

            const buildError =
                this.extractBuildError(
                    error
                );

            errors.push(
                buildError
            );

            checks.push({

                name:
                    'Angular Build',

                status:
                    'FAILED',

                message:
                    'Angular project build failed.'

            });

        }


        // ==================================================
        // 8. Final result
        // ==================================================

        const success =
            errors.length === 0 &&
            buildSuccessful;


        return {

            success,

            projectPath,

            buildSuccessful,

            filesScanned,

            standaloneComponents,

            nonStandaloneComponents,

            errors,

            warnings,

            checks,

            message:
                success
                    ? 'Standalone migration validation completed successfully.'
                    : 'Standalone migration validation completed with errors.'

        };

    }


    // ======================================================
    // Find TypeScript files
    // ======================================================

    private async findTypeScriptFiles(
        projectPath: string
    ): Promise<string[]> {

        const files: string[] = [];


        const scan =
            async (
                directory: string
            ): Promise<void> => {

                const entries =
                    await fs.readdir(
                        directory,
                        {
                            withFileTypes: true
                        }
                    );


                for (
                    const entry of entries
                ) {

                    const fullPath =
                        path.join(
                            directory,
                            entry.name
                        );


                    if (
                        entry.isDirectory()
                    ) {

                        if (

                            entry.name ===
                                'node_modules' ||

                            entry.name ===
                                'dist' ||

                            entry.name ===
                                '.angular' ||

                            entry.name ===
                                '.git'

                        ) {

                            continue;

                        }


                        await scan(
                            fullPath
                        );

                        continue;

                    }


                    if (

                        entry.isFile() &&

                        entry.name.endsWith(
                            '.ts'
                        ) &&

                        !entry.name.endsWith(
                            '.spec.ts'
                        )

                    ) {

                        files.push(
                            fullPath
                        );

                    }

                }

            };


        await scan(
            projectPath
        );


        return files;

    }


    // ======================================================
    // Standalone detection
    // ======================================================

    private isStandaloneComponent(
        source: string
    ): boolean {

        const componentMatch =
            source.match(

                /@Component\s*\(\s*\{([\s\S]*?)\}\s*\)/

            );


        if (!componentMatch) {

            return false;

        }


        return componentMatch[1]
            .includes(
                'standalone: true'
            );

    }


    // ======================================================
    // Common Angular directives
    // ======================================================

    private usesCommonAngularDirectives(
        source: string
    ): boolean {

        return (

            source.includes(
                '*ngIf'
            ) ||

            source.includes(
                '*ngFor'
            ) ||

            source.includes(
                '[ngClass]'
            ) ||

            source.includes(
                '[ngStyle]'
            ) ||

            source.includes(
                'ngSwitch'
            ) ||

            source.includes(
                'ngTemplateOutlet'
            ) ||

            source.includes(
                '| async'
            ) ||

            source.includes(
                '| date'
            )

        );

    }


    // ======================================================
    // Router detection
    // ======================================================

    private usesRouterFeatures(
        source: string
    ): boolean {

        return (

            source.includes(
                '[routerLink]'
            ) ||

            source.includes(
                'routerLink='
            ) ||

            source.includes(
                'routerLinkActive'
            ) ||

            source.includes(
                '<router-outlet'
            )

        );

    }


    // ======================================================
    // Forms detection
    // ======================================================

    private usesFormsFeatures(
        source: string
    ): boolean {

        return (

            source.includes(
                '[(ngModel)]'
            ) ||

            source.includes(
                'ngModel'
            ) ||

            source.includes(
                'formGroup'
            ) ||

            source.includes(
                'formControl'
            ) ||

            source.includes(
                'formControlName'
            ) ||

            source.includes(
                'formArrayName'
            ) ||

            source.includes(
                'formGroupName'
            )

        );

    }


    // ======================================================
    // Build error extraction
    // ======================================================

    private extractBuildError(
        error: unknown
    ): string {

        if (
            error &&
            typeof error === 'object'
        ) {

            const value =
                error as {

                    stdout?: string;

                    stderr?: string;

                    message?: string;

                };


            if (
                value.stderr
            ) {

                return value.stderr
                    .trim()
                    .substring(
                        0,
                        5000
                    );

            }


            if (
                value.stdout
            ) {

                return value.stdout
                    .trim()
                    .substring(
                        0,
                        5000
                    );

            }


            if (
                value.message
            ) {

                return value.message
                    .substring(
                        0,
                        5000
                    );

            }

        }


        return 'Angular build failed.';

    }

}