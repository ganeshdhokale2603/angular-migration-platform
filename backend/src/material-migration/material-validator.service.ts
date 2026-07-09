import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as fs from 'fs-extra';
import { MaterialValidationReport } from './material-validation.report';

@Injectable()
export class MaterialValidatorService {
  async validate(projectPath: string): Promise<MaterialValidationReport> {
    const files = await fg(['**/*.ts'], {
      cwd: projectPath,
      absolute: true,
      ignore: ['**/node_modules/**'],
    });

    let legacy = 0;
    let mdc = 0;

    for (const file of files) {
      const source = await fs.readFile(file, 'utf8');

      legacy += (source.match(/legacy/gi) ?? []).length;

      mdc += (source.match(/@angular\/material/gi) ?? []).length;
    }

    const score =
      legacy + mdc === 0 ? 100 : Math.round((mdc / (legacy + mdc)) * 100);

    const recommendations: string[] = [];

    if (legacy > 0) {
      recommendations.push('Replace remaining legacy Material components.');
    }

    if (score === 100) {
      recommendations.push('Material migration completed successfully.');
    }

    return {
      totalLegacyComponents: legacy,

      totalMdcComponents: mdc,

      compatibilityScore: score,

      recommendations,
    };
  }
}
