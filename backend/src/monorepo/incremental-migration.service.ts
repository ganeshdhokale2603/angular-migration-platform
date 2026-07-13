import { Injectable } from '@nestjs/common';
import { MigrationPlan, MigrationTask } from './models/migration-plan.model';

@Injectable()
export class IncrementalMigrationService {

    createPlan(

        projects: string[]

    ): MigrationPlan {

        const tasks: MigrationTask[] = [];

        projects.forEach((project, index) => {

            tasks.push({

                project,

                order: index + 1

            });

        });

        return {

            totalProjects: tasks.length,

            tasks

        };

    }

}