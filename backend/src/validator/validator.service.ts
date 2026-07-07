import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ValidatorService {
  async validate(projectPath: string) {
    const result = {
      npmInstall: false,
      build: false,
      lint: false,
      logs: [] as string[],
    };

    try {
      console.log('Running npm install...');

      await execAsync('npm install', {
        cwd: projectPath,
      });

      result.npmInstall = true;

      result.logs.push('npm install successful');
    } catch (e: any) {
      result.logs.push(`npm install failed\n${e.message}`);

      return result;
    }

    try {
      console.log('Running ng build...');

      await execAsync('npx ng build', {
        cwd: projectPath,
      });

      result.build = true;

      result.logs.push('ng build successful');
    } catch (e: any) {
      result.logs.push(`ng build failed\n${e.message}`);
    }

    try {
      console.log('Running ng lint...');

      await execAsync('npx ng lint', {
        cwd: projectPath,
      });

      result.lint = true;

      result.logs.push('ng lint successful');
    } catch (e: any) {
      result.logs.push(`ng lint failed\n${e.message}`);
    }

    return result;
  }
}
