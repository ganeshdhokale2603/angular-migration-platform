import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';
import { SignalCandidate } from './models/signal-candidate';

@Injectable()
export class SignalDetectorService {
  detect(sourceFile: ts.SourceFile): SignalCandidate[] {
    const candidates: SignalCandidate[] = [];

    const visit = (node: ts.Node) => {
      //------------------------------------
      // Property Declaration
      //------------------------------------

      if (ts.isPropertyDeclaration(node)) {
        const text = node.getText(sourceFile);

        const className =
          node.parent && ts.isClassDeclaration(node.parent)
            ? (node.parent.name?.text ?? 'Unknown')
            : 'Unknown';

        //------------------------------------
        // BehaviorSubject
        //------------------------------------

        if (text.includes('BehaviorSubject')) {
          candidates.push({
            file: sourceFile.fileName,

            className,

            property: node.name.getText(sourceFile),

            type: 'BehaviorSubject',

            line:
              sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
              1,

            recommendation: 'Replace with signal()',
          });
        }

        //------------------------------------

        if (text.includes('ReplaySubject')) {
          candidates.push({
            file: sourceFile.fileName,

            className,

            property: node.name.getText(sourceFile),

            type: 'ReplaySubject',

            line:
              sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
              1,

            recommendation: 'Replace with signal()',
          });
        }

        //------------------------------------

        if (text.includes('Subject<')) {
          candidates.push({
            file: sourceFile.fileName,

            className,

            property: node.name.getText(sourceFile),

            type: 'Subject',

            line:
              sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
              1,

            recommendation: 'Replace with signal()',
          });
        }

        //------------------------------------

        if (text.includes('EventEmitter')) {
          candidates.push({
            file: sourceFile.fileName,

            className,

            property: node.name.getText(sourceFile),

            type: 'EventEmitter',

            line:
              sourceFile.getLineAndCharacterOfPosition(node.getStart()).line +
              1,

            recommendation: 'Review for output() migration',
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    return candidates;
  }
}
