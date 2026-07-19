import { Injectable } from '@nestjs/common';

import { ProjectInfo } from '../models/project-info.model';

import { WorkspaceType } from '../models/workspace-type.enum';

@Injectable()
export class ProjectDiscoveryService {

    discover(

        projectPath: string

    ): ProjectInfo {

        return {

            projectName: 'Angular Demo',

            angularVersion: '8.2.14',

            nodeVersion: process.version,

            packageManager: 'npm',

            workspaceType: WorkspaceType.ANGULAR,

            angularCliVersion: '8.3.29',

            applications: [

                'demo-app'

            ],

            libraries: []

        };

    }

}