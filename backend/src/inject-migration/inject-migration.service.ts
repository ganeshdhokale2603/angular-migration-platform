import {
    Injectable
} from '@nestjs/common';

import * as fs from 'fs-extra';

import * as path from 'path';

import * as fg from 'fast-glob';

import {
    InjectMigrationResult,
    InjectMigrationFileResult
} from './models/inject-migration-result.model';

import {
    InjectMigrationTransformer
} from './inject-migration.transformer';

@Injectable()
export class InjectMigrationService {

    private readonly transformer =
        new InjectMigrationTransformer();

    async scan(
        projectPath: string
    ): Promise<InjectMigrationResult> {

        const files =
            await fg(
                [
                    '**/*.ts'
                ],
                {
                    cwd: projectPath,
                    absolute: true,
                    ignore: [
                        '**/node_modules/**',
                        '**/dist/**',
                        '**/.angular/**'
                    ]
                }
            );

        const results:
            InjectMigrationFileResult[] = [];

        let constructorsFound = 0;

        let dependenciesConverted = 0;

        for (
            const file
            of files
        ) {

            try {

                const source =
                    await fs.readFile(
                        file,
                        'utf8'
                    );

                const analysis =
                    this.transformer.analyze(
                        source
                    );

                if (
                    !analysis.found
                ) {

                    continue;

                }

                constructorsFound++;

                dependenciesConverted +=
                    analysis.dependencies.length;

                results.push({

                    file,

                    modified: false,

                    constructorsFound: 1,

                    dependenciesConverted:
                        analysis.dependencies.length,

                    dependencies:
                        analysis.dependencies.map(
                            dependency =>
                                `${dependency.parameterName}: ${dependency.typeName}`
                        ),

                    message:
                        'Constructor injection detected.'

                });

            }
            catch (error) {

                results.push({

                    file,

                    modified: false,

                    constructorsFound: 0,

                    dependenciesConverted: 0,

                    dependencies: [],

                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unable to analyze file.'

                });

            }

        }

        return {

            success: true,

            projectPath,

            filesScanned:
                files.length,

            filesModified: 0,

            constructorsFound,

            dependenciesConverted,

            files: results,

            errors: [],

            warnings: [],

            message:
                'Inject migration scan completed successfully.'

        };

    }

}