import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';

import {
  ImportTransformationResult,
  ImportTransformationChange
} from './models/import-transformation-result.model';

@Injectable()
export class ImportTransformerService {

  transform(source: string): ImportTransformationResult {

    const sourceFile = ts.createSourceFile(
      'migration.ts',
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

    const changes: ImportTransformationChange[] = [];

    const statements = [...sourceFile.statements];

    const transformedStatements = statements.map(statement => {

      if (!ts.isImportDeclaration(statement)) {
        return statement;
      }

      const moduleSpecifier = statement.moduleSpecifier;

      if (!ts.isStringLiteral(moduleSpecifier)) {
        return statement;
      }

      const originalModule = moduleSpecifier.text;

      const migration = this.getMigration(originalModule);

      if (!migration) {
        return statement;
      }

      const importClause = statement.importClause;

      if (!importClause) {
        return statement;
      }

      const importedNames = this.getImportedNames(
        importClause
      );

      changes.push({
        originalModule,
        targetModule: migration.targetModule,
        imports: importedNames
      });

      return this.createImportDeclaration(
        statement,
        migration.targetModule
      );
    });

    const transformedFile = ts.factory.updateSourceFile(
      sourceFile,
      transformedStatements
    );

    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed
    });

    const transformedSource =
      printer.printFile(transformedFile);

    return {
      source: transformedSource,
      changed: changes.length > 0,
      changes
    };
  }

  private getMigration(
    module: string
  ): {
    targetModule: string;
  } | null {

    switch (module) {

      /*
       * RxJS legacy imports
       *
       * rxjs/Observable -> rxjs
       * rxjs/Subject    -> rxjs
       * rxjs/BehaviorSubject -> rxjs
       */

      case 'rxjs/Observable':

        return {
          targetModule: 'rxjs'
        };

      case 'rxjs/Subject':

        return {
          targetModule: 'rxjs'
        };

      case 'rxjs/BehaviorSubject':

        return {
          targetModule: 'rxjs'
        };

      /*
       * Angular legacy HTTP package
       *
       * This rule should only be used for imports
       * that are compatible with @angular/common/http.
       */

      case '@angular/http':

        return {
          targetModule: '@angular/common/http'
        };

      default:

        return null;
    }
  }

  private getImportedNames(
    importClause: ts.ImportClause
  ): string[] {

    const imports: string[] = [];

    if (importClause.name) {
      imports.push(
        importClause.name.text
      );
    }

    const bindings =
      importClause.namedBindings;

    if (
      bindings &&
      ts.isNamedImports(bindings)
    ) {

      bindings.elements.forEach(
        element => {

          imports.push(
            element.name.text
          );

        }
      );
    }

    if (
      bindings &&
      ts.isNamespaceImport(bindings)
    ) {

      imports.push(
        `* as ${bindings.name.text}`
      );
    }

    return imports;
  }

  private createImportDeclaration(
    original: ts.ImportDeclaration,
    targetModule: string
  ): ts.ImportDeclaration {

    const importClause =
      original.importClause;

    if (!importClause) {
      return original;
    }

    return ts.factory.updateImportDeclaration(
      original,
      original.modifiers,
      ts.factory.updateImportClause(
        importClause,
        importClause.isTypeOnly,
        importClause.name,
        importClause.namedBindings
      ),
      ts.factory.createStringLiteral(
        targetModule
      ),
      original.attributes
    );
  }
}