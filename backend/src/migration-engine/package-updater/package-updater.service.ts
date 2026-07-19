import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

import { PackageUpdateResult } from './models/package-update-result.model';

@Injectable()
export class PackageUpdaterService {

    async update(

        projectPath: string,

        targetVersion: number

    ): Promise<PackageUpdateResult> {

        const packagePath = path.join(

            projectPath,

            'package.json'

        );

        const backupPath = path.join(

            projectPath,

            'package.backup.json'

        );

        await fs.copy(

            packagePath,

            backupPath

        );

        const packageJson =

            await fs.readJson(

                packagePath

            );

        const updatedDependencies: string[] = [];

        this.updateDependencies(

            packageJson.dependencies,

            targetVersion,

            updatedDependencies

        );

        this.updateDependencies(

            packageJson.devDependencies,

            targetVersion,

            updatedDependencies

        );

        await fs.writeJson(

            packagePath,

            packageJson,

            {

                spaces: 2

            }

        );

        return {

            success: true,

            packagePath,

            backupPath,

            updatedDependencies

        };

    }

    private updateDependencies(

        dependencies: Record<string, string>,

        version: number,

        updated: string[]

    ) {

        if (!dependencies) {

            return;

        }

        Object.keys(

            dependencies

        ).forEach(

            dependency => {

                if (

                    dependency.startsWith(

                        '@angular/'

                    )

                ) {

                    dependencies[dependency] =

                        `^${version}.0.0`;

                    updated.push(

                        dependency

                    );

                }

            }

        );

        if (

            dependencies.typescript

        ) {

            dependencies.typescript =

                this.getTypescriptVersion(

                    version

                );

            updated.push(

                'typescript'

            );

        }

        if (

            dependencies.rxjs

        ) {

            dependencies.rxjs =

                version >= 13

                    ? '^7.8.0'

                    : '^6.6.0';

            updated.push(

                'rxjs'

            );

        }

    }

    private getTypescriptVersion(

        version: number

    ): string {

        switch (version) {

            case 16:

                return "~4.9.5";

            case 17:

                return "~5.2.2";

            case 18:

                return "~5.4.5";

            case 19:

                return "~5.6.2";

            case 20:

                return "~5.8.2";

            default:

                return "~5.8.2";

        }

    }

}