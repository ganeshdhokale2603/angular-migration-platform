import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ProjectInfo } from '../interfaces/project-info.interface';

@Injectable()
export class ProjectAnalyzerService {
  async analyze(projectPath: string): Promise<ProjectInfo> {
    const packageJsonPath = path.join(projectPath, 'package.json');

    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error('package.json not found.');
    }

    const packageJson = await fs.readJson(packageJsonPath);

    const dependencies = {
      ...packageJson.dependencies,

      ...packageJson.devDependencies,
    };

    const angularVersion = dependencies['@angular/core'];

    if (!angularVersion) {
      return {
        isAngularProject: false,
      };
    }

    const mainTs = path.join(projectPath, 'src', 'main.ts');

    let standalone = false;

    if (await fs.pathExists(mainTs)) {
      const content = await fs.readFile(mainTs, 'utf8');

      standalone = content.includes('bootstrapApplication');
    }

    const angularJson = path.join(projectPath, 'angular.json');

    if (!(await fs.pathExists(angularJson))) {
      throw new Error('angular.json not found.');
    }

    const srcFolder = path.join(projectPath, 'src');

    if (!(await fs.pathExists(srcFolder))) {
      throw new Error('src folder not found.');
    }

    return {
      isAngularProject: true,

      angularVersion,

      standalone,

      nodeVersion: packageJson.engines?.node,

      typescriptVersion: dependencies['typescript'],

      rxjsVersion: dependencies['rxjs'],

      packageManager: packageJson.packageManager ?? 'npm',
    };
  }
}
