import * as ts from 'typescript';
import { CleanupReport } from './cleanup.report';

export class SubscriptionCleanup {
  analyze(source: ts.SourceFile): CleanupReport {
    let destroySubjects = 0;

    let takeUntilDestroyedCandidates = 0;

    let destroyRefDetected = false;

    const visit = (node: ts.Node) => {
      const text = node.getText();

      if (text.includes('Subject<void>') || text.includes('destroy$')) {
        destroySubjects++;
      }

      if (text.includes('takeUntil(')) {
        takeUntilDestroyedCandidates++;
      }

      if (text.includes('DestroyRef')) {
        destroyRefDetected = true;
      }

      ts.forEachChild(node, visit);
    };

    visit(source);

    return {
      destroySubjects,

      takeUntilDestroyedCandidates,

      destroyRefDetected,

      migrated: 0,
    };
  }
}
