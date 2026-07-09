import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';

import { MaterialScanner } from './material.scanner';
import { MaterialTransformer } from './material.transformer';

@Injectable()
export class MaterialScannerService {
  private readonly scanner = new MaterialScanner();

  private readonly transformer = new MaterialTransformer();

  scan(source: ts.SourceFile) {
    return this.scanner.scan(source);
  }

  migrate(source: string) {
    return this.transformer.transform(source);
  }
}
