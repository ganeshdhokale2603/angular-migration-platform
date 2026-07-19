export interface MigrationOptions {

    targetVersion: number;

    enableRollback: boolean;

    enableAI: boolean;

    autoInstall: boolean;

    autoBuild: boolean;

    autoCommit: boolean;

}