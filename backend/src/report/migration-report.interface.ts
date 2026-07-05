export interface MigrationReport {

    projectName: string;

    filesScanned: number;

    filesMigrated: number;

    components: number;

    modules: number;

    services: number;

    generatedAt: Date;

}