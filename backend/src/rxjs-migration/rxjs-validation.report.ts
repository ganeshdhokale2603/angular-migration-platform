export interface RxjsValidationReport {

    modernizationScore: number;

    memoryLeakScore: number;

    recommendations: string[];

    validationPassed: boolean;

}