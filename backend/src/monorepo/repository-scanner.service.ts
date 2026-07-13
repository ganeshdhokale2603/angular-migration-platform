import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { RepositoryInfo } from './models/repository-info.model';

@Injectable()
export class RepositoryScannerService {

    scan(projectRoot: string): RepositoryInfo[] {

        const repositories: RepositoryInfo[] = [];

        this.scanFolder(
            path.join(projectRoot, 'apps'),
            'Application',
            repositories
        );

        this.scanFolder(
            path.join(projectRoot, 'libs'),
            'Library',
            repositories
        );

        this.scanFolder(
            path.join(projectRoot, 'projects'),
            'Application',
            repositories
        );

        return repositories;

    }

    private scanFolder(

        folder: string,

        type: 'Application' | 'Library',

        repositories: RepositoryInfo[]

    ) {

        if (!fs.existsSync(folder)) {

            return;

        }

        const entries =
            fs.readdirSync(folder, {

                withFileTypes: true

            });

        entries.forEach(entry => {

            if (!entry.isDirectory()) {

                return;

            }

            const projectJson =
                path.join(folder, entry.name, 'project.json');

            const packageJson =
                path.join(folder, entry.name, 'package.json');

            if (
                fs.existsSync(projectJson) ||
                fs.existsSync(packageJson)
            ) {

                repositories.push({

                    name: entry.name,

                    path: path.join(folder, entry.name),

                    type,

                    framework: 'Angular',

                    migrated: false

                });

            }

        });

    }

}