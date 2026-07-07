import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as fs from 'fs-extra';
import { TemplateValidationResult } from './models/template-validation-result';

@Injectable()
export class TemplateValidatorService {
  async validate(projectPath: string): Promise<TemplateValidationResult[]> {
    const files = await fg(['**/*.html'], {
      cwd: projectPath,
      absolute: true,
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    const results: TemplateValidationResult[] = [];

    for (const file of files) {
      const html = await fs.readFile(file, 'utf8');

      const warnings: string[] = [];

      //------------------------------------
      // Legacy Directives
      //------------------------------------

      if (html.includes('*ngIf')) {
        warnings.push('Legacy *ngIf still exists');
      }

      if (html.includes('*ngFor')) {
        warnings.push('Legacy *ngFor still exists');
      }

      if (html.includes('[ngSwitch]')) {
        warnings.push('Legacy ngSwitch still exists');
      }

      //------------------------------------
      // Control Flow Balance
      //------------------------------------

      const ifCount = (html.match(/@if/g) ?? []).length;

      const braceCount = (html.match(/{/g) ?? []).length;

      if (ifCount > braceCount) {
        warnings.push('Possible missing closing brace');
      }

      results.push({
        file,

        valid: warnings.length === 0,

        warnings,
      });
    }

    return results;
  }
}
