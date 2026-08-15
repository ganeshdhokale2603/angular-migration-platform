import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { AstResult } from './models/ast-result.model';
import { ImportInfo } from './models/import-info.model';
import { ClassInfo } from './models/class-info.model';

@Injectable()
export class AstParserService {
  async parse(filePath: string): Promise<ts.SourceFile> {
    const source = await fs.readFile(filePath, 'utf8');

    return ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
  }

  print(sourceFile: ts.SourceFile): string {
    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    });

    return printer.printFile(sourceFile);
  }

  createSourceFile(fileName: string, code: string): ts.SourceFile {
    return ts.createSourceFile(
      fileName,
      code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
  }

  async save(filePath: string, code: string) {
    await fs.writeFile(filePath, code, 'utf8');
  }

  async analyze(filePath: string): Promise<AstResult> {

    const sourceFile = await this.parse(filePath);

    const imports: ImportInfo[] = [];

    const classes: ClassInfo[] = [];

    sourceFile.forEachChild(node => {

      if (ts.isImportDeclaration(node)) {

        const module = (
          node.moduleSpecifier as ts.StringLiteral
        ).text;

        const namedImports: string[] = [];

        if (

          node.importClause?.namedBindings &&

          ts.isNamedImports(

            node.importClause.namedBindings

          )

        ) {

          node.importClause.namedBindings.elements.forEach(

            element =>

              namedImports.push(

                element.name.text

              )

          );

        }

        imports.push({

          module,

          namedImports

        });

      }

      if (ts.isClassDeclaration(node)) {

        const decorators =
          node.modifiers
            ?.filter(

              m =>

                m.kind ===

                ts.SyntaxKind.Decorator

            )
            .map(

              d => d.getText()

            ) ?? [];

        const methods: string[] = [];

        const properties: string[] = [];

        const constructorParameters: string[] = [];

        node.members.forEach(member => {

          if (ts.isMethodDeclaration(member)) {

            methods.push(

              member.name.getText()

            );

          }

          if (ts.isPropertyDeclaration(member)) {

            properties.push(

              member.name.getText()

            );

          }

          if (ts.isConstructorDeclaration(member)) {

            member.parameters.forEach(param =>

              constructorParameters.push(

                param.name.getText()

              )

            );

          }

        });

        classes.push({

          className:

            node.name?.text ??

            'Anonymous',

          decorators,

          methods,

          properties,

          constructorParameters

        });

      }

    });

    return {

      filePath,

      imports,

      classes

    };

  }

}
