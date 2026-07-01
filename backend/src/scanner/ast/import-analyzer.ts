import * as ts from 'typescript';

export class ImportAnalyzer {
  static getImports(sourceFile: ts.SourceFile): string[] {
    const imports: string[] = [];

    sourceFile.forEachChild((node) => {
      if (ts.isImportDeclaration(node)) {
        const moduleName = (node.moduleSpecifier as ts.StringLiteral).text;

        imports.push(moduleName);
      }
    });

    return imports;
  }
}
