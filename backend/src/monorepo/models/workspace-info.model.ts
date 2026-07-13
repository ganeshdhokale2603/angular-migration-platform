export interface WorkspaceInfo {

    type: 'Angular' | 'Nx' | 'Unknown';

    rootPath: string;

    workspaceName: string;

    apps: number;

    libraries: number;

    hasNx: boolean;

    hasAngularJson: boolean;

}