import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';
import * as fs from 'fs-extra';

@Injectable()
export class AstParserService {

  async parse(filePath: string): Promise<ts.SourceFile> {

    const source = await fs.readFile(filePath, 'utf8');

    return ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

  }

  print(sourceFile: ts.SourceFile): string {

    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed
    });

    return printer.printFile(sourceFile);

  }

  async save(
    filePath: string,
    sourceFile: ts.SourceFile
  ) {

    const code = this.print(sourceFile);

    await fs.writeFile(
      filePath,
      code,
      'utf8'
    );

  }

}