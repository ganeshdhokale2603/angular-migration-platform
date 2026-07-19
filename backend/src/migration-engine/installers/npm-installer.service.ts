import { Injectable } from '@nestjs/common';

import { CommandExecutor } from '../executors/command.executor';

import { InstallResult } from './models/install-result.model';

@Injectable()
export class NpmInstallerService {

    constructor(

        private readonly commandExecutor: CommandExecutor

    ) {}

    async install(

        projectPath: string

    ): Promise<InstallResult> {

        const result =

            await this.commandExecutor.execute(

                'npm install',

                projectPath

            );

        return {

            success: result.success,

            duration: result.duration,

            installedPackages: 0,

            stdout: result.stdout,

            stderr: result.stderr

        };

    }

}