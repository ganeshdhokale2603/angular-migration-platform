import { Injectable } from '@nestjs/common';

import { MigrationPlan } from './models/migration-plan.model';

import { MigrationStep } from './models/migration-step.model';

@Injectable()
export class MigrationPlannerService {

    createPlan(

        projectName: string,

        currentVersion: number,

        targetVersion: number

    ): MigrationPlan {

        const steps: MigrationStep[] = [];

        for (

            let version = currentVersion;

            version < targetVersion;

            version++

        ) {

            steps.push({

                fromVersion: version,

                toVersion: version + 1,

                nodeVersion: this.getNodeVersion(version + 1),

                typescriptVersion: this.getTypescriptVersion(version + 1),

                rxjsVersion: this.getRxjsVersion(version + 1),

                angularCliVersion: `${version + 1}`,

                materialVersion: `${version + 1}`,

                command:

                    `ng update @angular/core@${version + 1} @angular/cli@${version + 1}`

            });

        }

        return {

            projectName,

            currentVersion,

            targetVersion,

            totalSteps: steps.length,

            steps

        };

    }

    private getNodeVersion(version: number): string {

        if (version <= 10) return '>=10.13';

        if (version <= 12) return '>=12.14';

        if (version <= 15) return '>=14.20';

        if (version <= 17) return '>=18.13';

        return '>=20.19';

    }

    private getTypescriptVersion(version: number): string {

        switch (version) {

            case 9:

                return '3.7';

            case 10:

                return '3.9';

            case 11:

                return '4.0';

            case 12:

                return '4.2';

            case 13:

                return '4.4';

            case 14:

                return '4.6';

            case 15:

                return '4.8';

            case 16:

                return '4.9';

            case 17:

                return '5.2';

            case 18:

                return '5.4';

            case 19:

                return '5.6';

            case 20:

                return '5.8';

            default:

                return 'Unknown';

        }

    }

    private getRxjsVersion(version: number): string {

        return version <= 12 ? '6.x' : '7.x';

    }

}