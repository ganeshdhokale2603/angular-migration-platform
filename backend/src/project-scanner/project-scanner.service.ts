import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';

import * as path from 'path';

import {
    ProjectFile
} from './models/project-file.model';

import {
    ProjectScanResult
} from './models/project-scan-result.model';

@Injectable()
export class ProjectScannerService {

    private readonly ignoredFolders = [

        'node_modules',

        'dist',

        '.git',

        '.angular',

        'coverage'

    ];

    async scan(

        projectPath: string

    ): Promise<ProjectScanResult> {

        const files: ProjectFile[] = [];

        await this.scanFolder(

            projectPath,

            files

        );

        return {

            projectPath,

            totalFiles: files.length,

            typescriptFiles:

                files.filter(

                    f => f.extension === '.ts'

                ).length,

            htmlFiles:

                files.filter(

                    f => f.extension === '.html'

                ).length,

            scssFiles:

                files.filter(

                    f => f.extension === '.scss'

                ).length,

            cssFiles:

                files.filter(

                    f => f.extension === '.css'

                ).length,

            jsonFiles:

                files.filter(

                    f => f.extension === '.json'

                ).length,

            files

        };

    }

    private async scanFolder(

        folder: string,

        files: ProjectFile[]

    ) {

        const entries =

            await fs.readdir(

                folder,

                {

                    withFileTypes: true

                }

            );

        for (const entry of entries) {

            if (

                entry.isDirectory()

            ) {

                if (

                    this.ignoredFolders.includes(

                        entry.name

                    )

                ) {

                    continue;

                }

                await this.scanFolder(

                    path.join(

                        folder,

                        entry.name

                    ),

                    files

                );

            }

            else {

                const fullPath = path.join(

                    folder,

                    entry.name

                );

                const stat =

                    await fs.stat(

                        fullPath

                    );

                const ext =

                    path.extname(

                        entry.name

                    );

                files.push({

                    path: fullPath,

                    name: entry.name,

                    extension: ext,

                    size: stat.size,

                    category:

                        this.getCategory(ext)

                });

            }

        }

    }

    private getCategory(

        ext: string

    ) {

        switch (ext) {

            case '.ts':

                return 'typescript';

            case '.html':

                return 'html';

            case '.scss':

                return 'scss';

            case '.css':

                return 'css';

            case '.json':

                return 'json';

            default:

                return 'other';

        }

    }

}