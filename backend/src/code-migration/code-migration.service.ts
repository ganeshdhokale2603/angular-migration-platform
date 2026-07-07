import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as ts from 'typescript';

import { AstParserService } from './parser/ast-parser.service';
import { ComponentTransformer } from './transformers/component.transformer';
import { ModuleTransformer } from './transformers/module.transformer';
import { ProviderTransformer } from './transformers/provider.transformer';
import { ReportService } from 'src/report/report.service';
import { StandaloneService } from '../standalone/standalone.service';
import { ImportResolverService } from '../import-resolver/import-resolver.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import { BootstrapService } from '../bootstrap/bootstrap.service';
import { RouteMigrationService } from '../route-migration/route-migration.service';
import { ValidatorService } from '../validator/validator.service';
import { PrGeneratorService } from '../pr-generator/pr-generator.service';
import { TemplateMigrationService } from '../template-migration/template-migration.service';
import { TemplateValidatorService } from '../template-validator/template-validator.service';

@Injectable()
export class CodeMigrationService {
  constructor(
    private readonly parser: AstParserService,
    private readonly reportService: ReportService,
    private readonly standalone: StandaloneService,
    private readonly resolver: ImportResolverService,
    private readonly bootstrap: BootstrapService,
    private readonly routeMigration: RouteMigrationService,
    private readonly validator: ValidatorService,
    private readonly prGenerator: PrGeneratorService,
    private readonly templateMigration: TemplateMigrationService,
    private readonly templateValidator: TemplateValidatorService,
  ) {}

  private readonly componentTransformer = new ComponentTransformer();

  private readonly moduleTransformer = new ModuleTransformer();

  private readonly providerTransformer = new ProviderTransformer();

  /**
   * Scan and migrate all Angular source files
   */
  async migrate(projectPath: string) {
    let migrated = 0;

    const files = await fg(['**/*.ts'], {
      cwd: projectPath,
      absolute: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.spec.ts'],
    });

    const summary = {
      files: files.length,

      components: 0,

      modules: 0,

      services: 0,
    };

    for (const file of files) {

    //----------------------------------
    // Parse
    //----------------------------------

    let sourceFile =
        await this.parser.parse(file);

    //----------------------------------
    // AST Transformations
    //----------------------------------

    sourceFile =
        this.componentTransformer.transform(sourceFile);

    sourceFile =
        this.moduleTransformer.transform(sourceFile);

    sourceFile =
        this.providerTransformer.transform(sourceFile);

    //----------------------------------
    // Convert AST → String
    //----------------------------------

    let updatedSource =
        this.parser.print(sourceFile);

    //----------------------------------
    // String Transformations
    //----------------------------------

    updatedSource =
        this.standalone.migrate(updatedSource);

    updatedSource =
        this.bootstrap.migrate(updatedSource);

    updatedSource =
        this.routeMigration.migrate(updatedSource);

    //----------------------------------
    // Template imports
    //----------------------------------

    const templateImports =
        await this.resolveTemplateImports(file);

    updatedSource =
        this.injectImports(
            updatedSource,
            templateImports
        );

    //----------------------------------
    // Save
    //----------------------------------

    await this.parser.save(
        file,
        updatedSource
    );

    migrated++;

    //----------------------------------
    // Statistics
    //----------------------------------

    this.inspectSourceFile(

        this.parser.createSourceFile(
            file,
            updatedSource
        ),

        summary

    );

}

  const validationResults = await this.templateValidator.validate(projectPath);

  const totalTemplates = validationResults.length;

  const validTemplates = validationResults.filter((v) => v.valid).length;

  const confidenceScore =
    totalTemplates === 0
      ? 100
      : Math.round((validTemplates / totalTemplates) * 100);
 
    //----------------------------------
    // Final Result
    //----------------------------------

    const report = {

    projectName:  projectPath.split(/[\\/]/).pop() ?? 'Unknown Project',

    filesScanned: summary.files,

    filesMigrated: migrated,

    components: summary.components,

    modules: summary.modules,

    services: summary.services,

    generatedAt: new Date(),

    validation: undefined,

    templateValidation:
  validationResults,

    confidenceScore

  };

    const reportPath = await this.reportService.generate(projectPath, report);

    const validation = await this.validator.validate(projectPath);

    report.validation = validation;

    const prFile = await this.prGenerator.generate(projectPath, report);

    const summaryFile = path.join(projectPath, 'migration-summary.json');

    const templateResult = await this.templateMigration.migrate(projectPath);
    
    const templateValidation =
      await this.templateValidator.validate(projectPath);

      console.log(
          '\nTemplate Validation'
      );

      console.table(

          templateValidation.map(v => ({

              File: v.file,

              Valid: v.valid,

              Warnings: v.warnings.join(', ')

          }))

      );
    
    await fs.writeJson(
      summaryFile,

      {
        report,

        validation,

        templateValidation: validationResults,

        confidenceScore,
      },

      {
        spaces: 2,
      },
    );

    console.log('');

    console.log('===================================');

    console.log('Migration Completed');

    console.log('===================================');

    console.log(
    `Files Migrated : ${migrated}`
    );

    console.log(
    `Templates Valid : ${validTemplates}/${totalTemplates}`
    );

    console.log(
    `Confidence Score : ${confidenceScore}%`
    );

    console.log(
    `Report : ${reportPath}`
    );

    console.log(
    `PR : ${prFile}`
    );

    console.log(
    `Summary : ${summaryFile}`
    );

    console.log('===================================');

    return {
      status: 'SUCCESS',

      migrated,

      summary,

      report,

      reportPath,

      validation,

      prFile,

      summaryFile,

      templateResult,

      templateValidation,


    };
  }

  /**
   * Collect project statistics
   */
  private inspectSourceFile(source: ts.SourceFile, summary: any) {
    const visit = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        const decorators = ts.getDecorators(node) ?? [];

        decorators.forEach((d) => {
          const expression = d.expression;

          if (ts.isCallExpression(expression)) {
            const name = expression.expression.getText();

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

  private async resolveTemplateImports(
    componentFile: string,
  ): Promise<string[]> {
    const htmlFile = componentFile.replace('.ts', '.html');

    const exists = await fs.pathExists(htmlFile);

    if (!exists) {
      return [];
    }

    const template = await fs.readFile(htmlFile, 'utf8');

    return this.resolver.resolve(template);
  }

  private injectImports(

source:string,

imports:string[]

):string{

    if(imports.length===0){

        return source;

    }

    const formatted=
imports.join(',\n');

    return source.replace(

/imports:\s*\[[^\]]*\]/,

`imports:[
${formatted}
]`

    );

}
}
