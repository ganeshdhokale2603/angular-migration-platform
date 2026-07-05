import * as ts from 'typescript';

export class ModuleTransformer {

  transform(sourceFile: ts.SourceFile): ts.SourceFile {

    console.log(
      `Transforming Module : ${sourceFile.fileName}`
    );

    return sourceFile;

  }

}