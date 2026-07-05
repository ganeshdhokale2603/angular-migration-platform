import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as ts from 'typescript';

import { AstParserService } from './parser/ast-parser.service';
import { ComponentTransformer } from '../transformers/component.transformer';
import { ModuleTransformer } from '../transformers/module.transformer';
import { ProviderTransformer } from '../transformers/provider.transformer';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class CodeMigrationService {

  constructor(
    private readonly parser: AstParserService,
    private readonly reportService: ReportService
  ) {}

  private readonly componentTransformer =
    new ComponentTransformer();

  private readonly moduleTransformer =
    new ModuleTransformer();

  private readonly providerTransformer =
    new ProviderTransformer();

  /**
   * Scan and migrate all Angular source files
   */
  async migrate(projectPath: string) {

    let migrated = 0;

    const files = await fg(
      ['**/*.ts'],
      {
        cwd: projectPath,
        absolute: true,
        ignore: [
          '**/node_modules/**',
          '**/dist/**',
          '**/*.spec.ts'
        ]
      }
    );

    const summary = {

      files: files.length,

      components: 0,

      modules: 0,

      services: 0

    };

    for (const file of files) {

      const source = await this.parser.parse(file);

      let updatedSource = source;

      //----------------------------------
      // Apply Component Transform
      //----------------------------------

      updatedSource =
        this.componentTransformer.transform(updatedSource);

      //----------------------------------
      // Apply Module Transform
      //----------------------------------

      updatedSource =
        this.moduleTransformer.transform(updatedSource);

      //----------------------------------
      // Apply Provider Transform
      //----------------------------------

      updatedSource =
        this.providerTransformer.transform(updatedSource);

      //----------------------------------
      // Save only if modified
      //----------------------------------

      if (updatedSource !== source) {

        await this.parser.save(
          file,
          updatedSource
        );

        migrated++;

        console.log(`✔ Migrated: ${file}`);

      }

      //----------------------------------
      // Collect Statistics
      //----------------------------------

      this.inspectSourceFile(
        ts.createSourceFile(
          file,
          updatedSource,
          ts.ScriptTarget.Latest,
          true
        ),
        summary
      );

    }

    //----------------------------------
    // Final Result
    //----------------------------------

    const report = {

    projectName: projectPath.split(/[\\/]/).pop(),

    filesScanned: summary.files,

    filesMigrated: migrated,

    components: summary.components,

    modules: summary.modules,

    services: summary.services,

    generatedAt: new Date()

};

const reportPath =
await this.reportService.generate(
    projectPath,
    report
);

return {

    status: 'SUCCESS',

    migrated,

    summary,

    report,

    reportPath

};

  }

  /**
   * Collect project statistics
   */
  private inspectSourceFile(
    source: ts.SourceFile,
    summary: any
  ) {

    const visit = (node: ts.Node) => {

      if (ts.isClassDeclaration(node)) {

        const decorators =
          ts.getDecorators(node) ?? [];

        decorators.forEach(d => {

          const expression = d.expression;

          if (ts.isCallExpression(expression)) {

            const name =
              expression.expression.getText();

            switch (name) {

              case 'Component':
                summary.components++;
                break;

              case 'NgModule':
                summary.modules++;
                break;

              case 'Injectable':
                summary.services++;
                break;

            }

          }

        });

      }

      ts.forEachChild(node, visit);

    };

    visit(source);

  }

}