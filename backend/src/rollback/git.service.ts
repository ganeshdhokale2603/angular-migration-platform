import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class GitService {

    isGitRepository(

        projectPath: string

    ): boolean {

        try {

            execSync(

                'git rev-parse --is-inside-work-tree',

                {

                    cwd: projectPath,

                    stdio: 'ignore'

                }

            );

            return true;

        } catch {

            return false;

        }

    }

    restore(

        projectPath: string

    ): boolean {

        try {

            execSync(

                'git restore .',

                {

                    cwd: projectPath

                }

            );

            execSync(

                'git clean -fd',

                {

                    cwd: projectPath

                }

            );

            return true;

        } catch {

            return false;

        }

    }

}