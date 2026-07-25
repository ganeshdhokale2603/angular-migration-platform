import { Injectable } from '@nestjs/common';

import { MigrationScore } from '../models/migration-score.model';

@Injectable()
export class MigrationScoreService {

    calculate(

        analysis: any

    ): MigrationScore {

        let compatibility = 100;
        let complexity = 100;
        let maintainability = 100;

        const gap = 20 - analysis.angularVersion;

        compatibility -= gap * 5;

        if (analysis.workspaceType?.includes('NgModule')) {

            compatibility -= 10;

        }

        if (analysis.totalSourceFiles > 300) {

            complexity -= 20;

        }

        if (analysis.totalComponents > 100) {

            complexity -= 15;

        }

        if (analysis.rxjsVersion?.startsWith('6')) {

            compatibility -= 10;

        }

        if (analysis.totalServices > 80) {

            maintainability -= 10;

        }

        compatibility = Math.max(0, compatibility);
        complexity = Math.max(0, complexity);
        maintainability = Math.max(0, maintainability);

        const overall = Math.round(

            (compatibility +
                complexity +
                maintainability) / 3

        );

        return {

            overall,

            compatibility,

            complexity,

            maintainability

        };

    }

}