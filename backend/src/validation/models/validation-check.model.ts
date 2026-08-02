export interface ValidationCheck {

    name: string;

    status: 'PASSED' | 'FAILED' | 'WARNING';

    message: string;

    duration: number;

}