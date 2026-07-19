export interface ProjectAnalysis {

    projectName: string;

    angularVersion: number;

    workspaceType: 'Angular CLI' | 'Nx' | 'Unknown';

    packageManager: 'npm' | 'yarn' | 'pnpm';

    nodeVersion?: string;

    hasAngularJson: boolean;

    hasNxJson: boolean;

    hasPackageJson: boolean;

    dependencies: string[];

    migrationTarget: number;

}