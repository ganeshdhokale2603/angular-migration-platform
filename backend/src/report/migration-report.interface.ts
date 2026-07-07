export interface MigrationReport {

    projectName: string | undefined;

    filesScanned: number;

    filesMigrated: number;

    components: number;

    modules: number;

    services: number;

    generatedAt: Date;

}