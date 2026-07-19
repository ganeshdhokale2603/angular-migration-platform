export interface InstallResult {

    success: boolean;

    duration: number;

    installedPackages: number;

    stdout: string;

    stderr: string;

}