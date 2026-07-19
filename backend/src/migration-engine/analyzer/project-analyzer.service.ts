import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

import { ProjectAnalysis } from './models/project-analysis.model';

@Injectable()
export class ProjectAnalyzerService {

    async analyze(
        projectPath: string
    ): Promise<ProjectAnalysis> {

        const packageJsonPath =
            path.join(projectPath, 'package.json');

        const angularJsonPath =
            path.join(projectPath, 'angular.json');

        const nxJsonPath =
            path.join(projectPath, 'nx.json');

        const hasPackageJson =
            await fs.pathExists(packageJsonPath);

        const hasAngularJson =
            await fs.pathExists(angularJsonPath);

        const hasNxJson =
            await fs.pathExists(nxJsonPath);

        if (!hasPackageJson) {

            throw new Error(
                'package.json not found.'
            );

        }

        const packageJson =
            await fs.readJson(packageJsonPath);

        const dependencies = {

            ...(packageJson.dependencies || {}),

            ...(packageJson.devDependencies || {})

        };

        const angularVersion =
            this.detectAngularVersion(
                dependencies
            );

        return {

            projectName:
                packageJson.name,

            angularVersion,

            workspaceType:
                hasNxJson
                    ? 'Nx'
                    : hasAngularJson
                        ? 'Angular CLI'
                        : 'Unknown',

            packageManager:
                'npm',

            nodeVersion:
                packageJson.engines?.node,

            hasAngularJson,

            hasNxJson,

            hasPackageJson,

            dependencies:
                Object.keys(dependencies),

            migrationTarget: 20

        };

    }

    private detectAngularVersion(
        dependencies: Record<string, string>
    ): number {

        const version =
            dependencies['@angular/core'];

        if (!version) {

            return 0;

        }

        const match =
            version.match(/\d+/);

        return match
            ? Number(match[0])
            : 0;

    }

}