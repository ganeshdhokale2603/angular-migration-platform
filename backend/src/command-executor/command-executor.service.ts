import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

export interface CommandResult {

    command?: string;

    exitCode?: number;

    status: 'SUCCESS' | 'FAILED';

    logs?: string[];

    error?: any;

}

@Injectable()
export class CommandExecutorService {

  /**
   * Execute migration commands
   */
  async executeUpgradePlan(
    projectPath: string,
    upgradePlan: any[]
) {

    const results: CommandResult[] = [];

    for (const step of upgradePlan) {

        console.log(
            `Migrating Angular ${step.fromVersion} → ${step.toVersion}`
        );

        step.status = 'RUNNING';

        try {

            await this.runCommand(
                'npm',
                ['install'],
                projectPath
            );

            const result = await this.runCommand(
                'npx',
                [
                    'ng',
                    'update',
                    `@angular/core@${step.toVersion}`,
                    `@angular/cli@${step.toVersion}`,
                    '--force'
                ],
                projectPath
            );

            step.status = 'SUCCESS';

            results.push(result);

        }
        catch (e) {

            step.status = 'FAILED';

            results.push({

                status: 'FAILED',

                error: e

            });

            break;

        }

    }

    return {

        status: upgradePlan.every(s => s.status === 'SUCCESS')
            ? 'SUCCESS'
            : 'FAILED',

        steps: upgradePlan,

        commands: results

    };

}

  /**
   * Execute a shell command
   */
  private runCommand(
    command: string,
    args: string[],
    cwd: string
  ): Promise<CommandResult> {

    return new Promise(resolve => {

      const logs: string[] = [];

      const child = spawn(
        command,
        args,
        {
          cwd,
          shell: true
        }
      );

      child.stdout.on('data', data => {

        const text = data.toString();

        console.log(text);

        logs.push(text);

      });

      child.stderr.on('data', data => {

        const text = data.toString();

        console.error(text);

        logs.push(text);

      });

      child.on('close', code => {

        resolve({

          command: `${command} ${args.join(' ')}`,

          exitCode: code ?? -1,

          status:
            code === 0
              ? 'SUCCESS'
              : 'FAILED',

          logs

        });

      });

      child.on('error', error => {

        resolve({

          command: `${command} ${args.join(' ')}`,

          exitCode: -1,

          status: 'FAILED',

          logs: [error.message]

        });

      });

    });

  }

}