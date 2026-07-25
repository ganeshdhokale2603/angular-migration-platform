import { Injectable } from '@nestjs/common';

import { MigrationRisk } from '../models/migration-risk.model';

@Injectable()
export class RiskAnalyzerService {

    analyze(

        analysis: any

    ): MigrationRisk {

        let score = 0;

        const reasons: string[] = [];

        // Angular Version Gap
        const gap = 20 - analysis.angularVersion;

        if (gap >= 8) {

            score += 40;

            reasons.push(
                'Large Angular version gap.'
            );

        }
        else if (gap >= 4) {

            score += 20;

            reasons.push(
                'Moderate Angular upgrade.'
            );

        }

        // Legacy Modules

        if (analysis.workspaceType?.includes('NgModule')) {

            score += 20;

            reasons.push(
                'Project uses NgModules.'
            );

        }

        // RxJS

        if (analysis.rxjsVersion &&
            analysis.rxjsVersion.startsWith('6')) {

            score += 15;

            reasons.push(
                'Older RxJS version.'
            );

        }

        // Large Project

        if (analysis.totalSourceFiles > 300) {

            score += 20;

            reasons.push(
                'Large project size.'
            );

        }

        let level: 'Low' | 'Medium' | 'High';

        if (score >= 60) {

            level = 'High';

        } else if (score >= 30) {

            level = 'Medium';

        } else {

            level = 'Low';

        }

        return {

            level,

            score,

            reasons

        };

    }

}