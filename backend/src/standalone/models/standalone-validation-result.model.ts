export type ValidationStatus =
    | 'PASSED'
    | 'FAILED'
    | 'WARNING';

export interface StandaloneValidationCheck {

    name: string;

    status: ValidationStatus;

    message: string;

}

export interface StandaloneValidationResult {

    success: boolean;

    projectPath: string;

    buildSuccessful: boolean;

    filesScanned: number;

    standaloneComponents: number;

    nonStandaloneComponents: number;

    errors: string[];

    warnings: string[];

    checks: StandaloneValidationCheck[];

    message: string;

}