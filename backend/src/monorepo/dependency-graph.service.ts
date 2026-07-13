import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import {
    DependencyGraph,
    DependencyNode
} from './models/dependency-graph.model';

@Injectable()
export class DependencyGraphService {

    build(projectRoot: string): DependencyGraph {

        const nodes: DependencyNode[] = [];

        this.scanFolder(
            path.join(projectRoot, 'apps'),
            nodes
        );

        this.scanFolder(
            path.join(projectRoot, 'libs'),
            nodes
        );

        this.scanFolder(
            path.join(projectRoot, 'projects'),
            nodes
        );

        return {

            nodes

        };

    }

    private scanFolder(

        folder: string,

        nodes: DependencyNode[]

    ) {

        if (!fs.existsSync(folder)) {

            return;

        }

        const entries = fs.readdirSync(folder, {

            withFileTypes: true

        });

        entries.forEach(entry => {

            if (!entry.isDirectory()) {

                return;

            }

            const projectPath =
                path.join(folder, entry.name);

            const packageJson =
                path.join(projectPath, 'package.json');

            let dependencies: string[] = [];

            if (fs.existsSync(packageJson)) {

                try {

                    const pkg = JSON.parse(
                        fs.readFileSync(packageJson, 'utf8')
                    );

                    dependencies = Object.keys(

                            pkg.dependencies ?? {}

                        ).filter(dep =>

                            !dep.startsWith('@angular/') &&
                            dep !== 'rxjs' &&
                            dep !== 'zone.js' &&
                            dep !== 'typescript'

                        );

                } catch {

                    dependencies = [];

                }

            }

            nodes.push({

                name: entry.name,

                dependencies

            });

        });

    }

}