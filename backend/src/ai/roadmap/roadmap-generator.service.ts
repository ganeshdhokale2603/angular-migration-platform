import { Injectable } from '@nestjs/common';

import {

    MigrationRoadmap,
    RoadmapStep

} from '../models/migration-roadmap.model';

@Injectable()
export class RoadmapGeneratorService {

    generate(

        analysis: any,
        estimatedHours: number

    ): MigrationRoadmap {

        const steps: RoadmapStep[] = [

            {

                phase: 1,

                title: 'Upgrade Angular Framework',

                description:
                    'Upgrade Angular dependencies to the target version.',

                estimatedHours: 6

            },

            {

                phase: 2,

                title: 'Convert Standalone Components',

                description:
                    'Migrate NgModule based components to standalone.',

                estimatedHours: 10

            },

            {

                phase: 3,

                title: 'Modernize Dependency Injection',

                description:
                    'Replace constructor injection with inject().',

                estimatedHours: 6

            },

            {

                phase: 4,

                title: 'Update Angular Templates',

                description:
                    'Replace *ngIf/*ngFor with @if/@for.',

                estimatedHours: 8

            },

            {

                phase: 5,

                title: 'Modernize RxJS',

                description:
                    'Replace deprecated RxJS APIs.',

                estimatedHours: 6

            },

            {

                phase: 6,

                title: 'Build, Test and Validation',

                description:
                    'Run build, unit tests and verify migration.',

                estimatedHours:
                    Math.max(
                        4,
                        estimatedHours - 36
                    )

            }

        ];

        return {

            totalPhases: steps.length,

            totalEstimatedHours: estimatedHours,

            steps

        };

    }

}