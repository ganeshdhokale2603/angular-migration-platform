export interface InjectMigrationResult {

    success: boolean;

    projectPath: string;

    filesScanned: number;

    filesModified: number;

    constructorsFound: number;

    dependenciesConverted: number;

    files: InjectMigrationFileResult[];

    errors: string[];

    warnings: string[];

    message: string;

}

export interface InjectMigrationFileResult {

    file: string;

    modified: boolean;

    constructorsFound: number;

    dependenciesConverted: number;

    dependencies: string[];

    message?: string;

}