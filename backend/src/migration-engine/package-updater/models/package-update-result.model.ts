export interface PackageUpdateResult {

    success: boolean;

    packagePath: string;

    backupPath: string;

    updatedDependencies: string[];

}