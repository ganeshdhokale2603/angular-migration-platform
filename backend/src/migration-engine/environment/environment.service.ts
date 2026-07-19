import { Injectable } from '@nestjs/common';

import { CommandExecutor } from '../executors/command.executor';

import { EnvironmentInfo } from './models/environment-info.model';

@Injectable()
export class EnvironmentService {

    constructor(

        private readonly commandExecutor: CommandExecutor

    ) {}

    async inspect(): Promise<EnvironmentInfo> {

        const node =
            await this.commandExecutor.execute(
                'node -v'
            );

        const npm =
            await this.commandExecutor.execute(
                'npm -v'
            );

        const angular =
            await this.commandExecutor.execute(
                'ng version'
            );

        const git =
            await this.commandExecutor.execute(
                'git --version'
            );

        const warnings: string[] = [];

        const nodeVersion =
            node.stdout.trim();

        if (nodeVersion.startsWith('v24')) {

            warnings.push(
                'Node.js 24 is currently not supported by Angular CLI 17.'
            );

        }

        return {

            operatingSystem: process.platform,

            nodeVersion,

            npmVersion:
                npm.stdout.trim(),

            angularCliVersion:
                this.extractAngularVersion(
                    angular.stdout
                ),

            gitVersion:
                git.stdout.trim(),

            packageManager: 'npm',

            supported:
                warnings.length === 0,

            warnings

        };

    }

    private extractAngularVersion(
        output: string
    ): string {

        const match =
            output.match(
                /Angular CLI:\s*([^\r\n]+)/i
            );

        return match
            ? match[1].trim()
            : 'Unknown';

    }

}