export interface CommandResult {

    success: boolean;

    exitCode: number;

    stdout: string;

    stderr: string;

    duration: number;

}