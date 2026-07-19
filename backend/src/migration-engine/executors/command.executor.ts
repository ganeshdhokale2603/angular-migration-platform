import { Injectable } from '@nestjs/common';

import { exec } from 'child_process';

import { promisify } from 'util';

import { CommandResult } from './models/command-result.model';

const execAsync = promisify(exec);

@Injectable()
export class CommandExecutor {

    async execute(

        command: string,

        workingDirectory?: string

    ): Promise<CommandResult> {

        const started = Date.now();

        try {

            const result = await execAsync(

                command,

                {

                    cwd: workingDirectory,

                    maxBuffer: 1024 * 1024 * 20

                }

            );

            return {

                success: true,

                exitCode: 0,

                stdout: result.stdout,

                stderr: result.stderr,

                duration: Date.now() - started

            };

        } catch (error: any) {

            return {

                success: false,

                exitCode: error.code ?? -1,

                stdout: error.stdout ?? '',

                stderr: error.stderr ?? error.message,

                duration: Date.now() - started

            };

        }

    }

}