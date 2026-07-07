import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import { HtmlParserService } from './html-parser.service';
import { TemplateTransformer } from './template.transformer';
import { TemplateChange } from './models/template-change';

@Injectable()
export class TemplateMigrationService {
  constructor(private readonly parser: HtmlParserService) {}

  private readonly transformer = new TemplateTransformer();

  async migrate(projectPath: string) {
    const files = await fg(['**/*.html'], {
      cwd: projectPath,
      absolute: true,
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    let migrated = 0;

    const changes: TemplateChange[] = [];

    for (const file of files) {
      const html = await this.parser.read(file);

      const result = this.transformer.transform(html);

      result.changes.forEach((change) => {
        change.file = file;
      });

      if (result.html !== html) {
        await this.parser.save(
          file,

          result.html,
        );

        migrated++;

        console.log(`✔ Template migrated : ${file}`);
      }

      changes.push(...result.changes);
    }

    console.table(
      changes.map((c) => ({
        Rule: c.rule,

        File: c.file,
      })),
    );

    return {
      files: files.length,

      migrated,

      changes,
    };
  }
}
