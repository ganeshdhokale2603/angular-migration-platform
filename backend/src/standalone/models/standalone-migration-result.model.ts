export interface StandaloneMigrationResult {

    success: boolean;

    project: string;

    filesScanned: number;

    filesModified: number;

    componentsConverted: number;

    modulesScanned: number;

    modulesModified: number;

    files: string[];

    message: string;

}