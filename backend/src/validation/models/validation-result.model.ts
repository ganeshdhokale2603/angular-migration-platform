import { ValidationCheck } from './validation-check.model';

export interface ValidationResult {

    success: boolean;

    project: string;

    startedAt: Date;

    completedAt: Date;

    durationSeconds: number;

    checks: ValidationCheck[];

    passed: number;

    failed: number;

    warnings: number;
     reportPath?: string;

}