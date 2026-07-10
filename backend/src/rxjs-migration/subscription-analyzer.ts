import * as ts from 'typescript';
import { SubscriptionReport } from './subscription.report';

export class SubscriptionAnalyzer {
  analyze(source: ts.SourceFile): SubscriptionReport {
    let subscriptions = 0;

    let takeUntilUsage = 0;

    let ngOnDestroyImplemented = false;

    const visit = (node: ts.Node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        if (node.expression.name.text === 'subscribe') {
          subscriptions++;
        }

        if (node.expression.name.text === 'pipe') {
          const text = node.getText();

          if (text.includes('takeUntil')) {
            takeUntilUsage++;
          }
        }
      }

      if (ts.isClassDeclaration(node)) {
        if (
          node.heritageClauses?.some((h) => h.getText().includes('OnDestroy'))
        ) {
          ngOnDestroyImplemented = true;
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(source);

    const unmanagedSubscriptions = Math.max(subscriptions - takeUntilUsage, 0);

    let memoryLeakRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

    if (unmanagedSubscriptions > 5) {
      memoryLeakRisk = 'HIGH';
    } else if (unmanagedSubscriptions > 0) {
      memoryLeakRisk = 'MEDIUM';
    }

    return {
      subscriptions,

      unmanagedSubscriptions,

      takeUntilUsage,

      ngOnDestroyImplemented,

      memoryLeakRisk,
    };
  }
}
