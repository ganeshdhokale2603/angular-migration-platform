import { Injectable } from '@nestjs/common';
import { RxjsValidationReport } from './rxjs-validation.report';

@Injectable()
export class RxjsValidatorService {

    validate(
        deprecatedOperators: number,
        unmanagedSubscriptions: number,
        destroySubjects: number
    ): RxjsValidationReport {

        const recommendations: string[] = [];

        let score = 100;

        if (deprecatedOperators > 0) {

            recommendations.push(
                'Replace deprecated RxJS operators.'
            );

            score -= deprecatedOperators * 2;

        }

        if (unmanagedSubscriptions > 0) {

            recommendations.push(
                'Use takeUntilDestroyed() for subscription cleanup.'
            );

            score -= unmanagedSubscriptions * 3;

        }

        if (destroySubjects > 0) {

            recommendations.push(
                'Replace Subject<void> with DestroyRef.'
            );

            score -= destroySubjects;

        }

        score = Math.max(score, 0);

        return {

            modernizationScore: score,

            memoryLeakScore: Math.max(
                100 - unmanagedSubscriptions * 10,
                0
            ),

            recommendations,

            validationPassed: score >= 80

        };

    }

}