import { Injectable } from '@nestjs/common';

import { CommandExecutor } from '../executors/command.executor';

import { BuildResult } from './models/build-result.model';

@Injectable()
export class BuildService {

    constructor(

        private readonly commandExecutor: CommandExecutor

    ) {}

    async build(

        projectPath: string

    ): Promise<BuildResult> {

        const result =

            await this.commandExecutor.execute(

                'ng build',

                projectPath

            );

        return {

            success: result.success,

            duration: result.duration,

            stdout: result.stdout,

            stderr: result.stderr

        };

    }

}