import * as ts from 'typescript';

export class ProviderTransformer {

  transform(sourceFile: ts.SourceFile): ts.SourceFile {

    console.log(
      `Transforming Providers : ${sourceFile.fileName}`
    );

    return sourceFile;

  }

}