import { Injectable } from '@nestjs/common';
import { MigrationReport } from '../report/models/migration-report';
import { RiskReport } from './risk.report';

@Injectable()
export class RiskAnalyzer {

    analyze(report: MigrationReport): RiskReport {

        let score = 0;

        const factors: string[] = [];

        if ((report.materialMigration?.legacyImports ?? 0) > 0) {

            score += 20;

            factors.push(
                'Legacy Angular Material components detected.'
            );

        }

        if (
            (report.rxjsMigration?.deprecatedOperators ?? 0) > 0
        ) {

            score += 15;

            factors.push(
                'Deprecated RxJS operators detected.'
            );

        }

        if (
            (report.routingReport?.deadRoutes ?? 0) > 0
        ) {

            score += 15;

            factors.push(
                'Dead routes found.'
            );

        }

        if (
            (report.routingReport?.circularDependencies ?? 0) > 0
        ) {

            score += 20;

            factors.push(
                'Circular routing dependencies detected.'
            );

        }

        if (
            (report.subscriptionAnalysis?.unmanagedSubscriptions ?? 0) > 0
        ) {

            score += 15;

            factors.push(
                'Unmanaged RxJS subscriptions found.'
            );

        }

        if (
            (report.changeDetection?.skippedComponents ?? 0) > 0
        ) {

            score += 10;

            factors.push(
                'Some components were not optimized.'
            );

        }

        if (
            (report.deadCode?.treeShakingScore ?? 100) < 70
        ) {

            score += 10;

            factors.push(
                'Low tree-shaking score.'
            );

        }

        score = Math.min(score, 100);

        return {

            overallRisk:
                score >= 60
                    ? 'HIGH'
                    : score >= 30
                        ? 'MEDIUM'
                        : 'LOW',

            riskScore: score,

            confidenceScore: 100 - Math.floor(score / 2),

            riskFactors: factors

        };

    }

}