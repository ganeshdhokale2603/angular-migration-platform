export interface MigrationStep {

    fromVersion: number;

    toVersion: number;

    nodeVersion: string;

    typescriptVersion: string;

    rxjsVersion: string;

    angularCliVersion: string;

    materialVersion: string;

    command: string;

}