import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { WorkspaceInfo } from './models/workspace-info.model';

@Injectable()
export class WorkspaceDetectorService {

    detect(projectPath: string): WorkspaceInfo {

        const angularJson =
            fs.existsSync(path.join(projectPath, 'angular.json'));

        const nxJson =
            fs.existsSync(path.join(projectPath, 'nx.json'));

        const workspaceJson =
            fs.existsSync(path.join(projectPath, 'workspace.json'));

        let type: 'Angular' | 'Nx' | 'Unknown' = 'Unknown';

        if (nxJson) {

            type = 'Nx';

        } else if (angularJson || workspaceJson) {

            type = 'Angular';

        }

        const packageJsonPath =
    path.join(projectPath, 'package.json');

if (fs.existsSync(packageJsonPath)) {

    const pkg = JSON.parse(

        fs.readFileSync(packageJsonPath, 'utf8')

    );

    if (pkg.devDependencies?.nx) {

        type = 'Nx';

    }

}

        return {

            type,

            rootPath: projectPath,

            workspaceName: path.basename(projectPath),

            apps: 0,

            libraries: 0,

            hasNx: nxJson,

            hasAngularJson: angularJson

        };

    }

}