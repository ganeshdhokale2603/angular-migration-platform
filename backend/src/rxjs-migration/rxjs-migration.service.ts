import { Injectable } from '@nestjs/common';
import * as ts from 'typescript';
import { RxjsScanner } from './rxjs.scanner';
import { RxjsTransformer } from './rxjs.transformer';
import { SubscriptionAnalyzer } from './subscription-analyzer';
import { SubscriptionCleanup } from './subscription-cleanup';

@Injectable()
export class RxjsMigrationService {
  private readonly scanner = new RxjsScanner();
  private readonly transformer = new RxjsTransformer();
  private readonly subscriptionAnalyzer = new SubscriptionAnalyzer();
  private readonly cleanup = new SubscriptionCleanup();

  scan(source: any) {
    return this.scanner.scan(source);
  }
  transform(source: string) {
    return this.transformer.transform(source);
  }

  analyzeSubscriptions(source: ts.SourceFile) {
    return this.subscriptionAnalyzer.analyze(source);
  }

  analyzeCleanup(source: ts.SourceFile) {
    return this.cleanup.analyze(source);
  }
}
