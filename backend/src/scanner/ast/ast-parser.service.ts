import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';

@Injectable()
export class AstParserService {
  parse(filePath: string): ts.SourceFile {
    return ts.createSourceFile(filePath, require('fs').readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true);
  }
}