import * as ts from 'typescript';
import { RxjsReport } from './rxjs.report';

export class RxjsScanner {
  scan(source: ts.SourceFile): RxjsReport {
    let totalRxjsImports = 0;

    let observableCount = 0;

    let subjectCount = 0;

    let behaviorSubjectCount = 0;

    let replaySubjectCount = 0;

    let asyncSubjectCount = 0;

    let subscriptionCount = 0;

    const deprecatedOperators = new Set<string>();

    const visit = (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) {
        const moduleName = node.moduleSpecifier
          .getText()
          .replace(/'/g, '')
          .replace(/"/g, '');

        if (moduleName.startsWith('rxjs')) {
          totalRxjsImports++;

          const clause = node.importClause;

          if (
            clause &&
            clause.namedBindings &&
            ts.isNamedImports(clause.namedBindings)
          ) {
            clause.namedBindings.elements.forEach((element) => {
              const name = element.name.text;

              switch (name) {
                case 'Observable':
                  observableCount++;
                  break;

                case 'Subject':
                  subjectCount++;
                  break;

                case 'BehaviorSubject':
                  behaviorSubjectCount++;
                  break;

                case 'ReplaySubject':
                  replaySubjectCount++;
                  break;

                case 'AsyncSubject':
                  asyncSubjectCount++;
                  break;

                case 'Subscription':
                  subscriptionCount++;
                  break;
              }
            });
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(source);

    return {
      totalRxjsImports,

      observableCount,

      subjectCount,

      behaviorSubjectCount,

      replaySubjectCount,

      asyncSubjectCount,

      subscriptionCount,

      deprecatedOperators: [...deprecatedOperators],
    };
  }
}
