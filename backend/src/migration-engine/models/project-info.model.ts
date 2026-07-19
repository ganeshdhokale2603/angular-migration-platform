import { WorkspaceType } from './workspace-type.enum';

export interface ProjectInfo {

    projectName: string;

    angularVersion: string;

    nodeVersion: string;

    packageManager: string;

    workspaceType: WorkspaceType;

    angularCliVersion: string;

    applications: string[];

    libraries: string[];

}