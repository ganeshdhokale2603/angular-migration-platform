import { Injectable } from '@nestjs/common';

import { CommandExecutor } from './command.executor';

import { MigrationPlan } from '../planner/models/migration-plan.model';

import { AngularUpdateResult } from './models/angular-update-result.model';

@Injectable()
export class AngularUpdateExecutor {

    constructor(

        private readonly commandExecutor: CommandExecutor

    ) {}

    async execute(

        projectPath: string,

        plan: MigrationPlan

    ): Promise<AngularUpdateResult> {

        const executedCommands: string[] = [];

        let stdout = '';

        let stderr = '';

        const started = Date.now();

        for (const step of plan.steps) {

            const command = step.command;

            executedCommands.push(command);

            const result =

                await this.commandExecutor.execute(

                    command,

                    projectPath

                );

            stdout += result.stdout;

            stderr += result.stderr;

            if (!result.success) {

                return {

                    success: false,

                    executedCommands,

                    duration: Date.now() - started,

                    stdout,

                    stderr

                };

            }

        }

        return {

            success: true,

            executedCommands,

            duration: Date.now() - started,

            stdout,

            stderr

        };

    }

}
