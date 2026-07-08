import { Injectable } from '@nestjs/common';
import { OnPushTransformer } from './onpush.transformer';
import { OnPushReport } from './onpush.report';

@Injectable()
export class ChangeDetectionService {
  private readonly transformer = new OnPushTransformer();

  private report: OnPushReport = {
    totalComponents: 0,

    alreadyUsingOnPush: 0,

    optimizedComponents: 0,

    skippedComponents: 0,
  };

  transform(source: string) {
    const result = this.transformer.transform(source);

    if (!source.includes('@Component')) {
      return result;
    }

    this.report.totalComponents++;

    if (result.optimized) {
      this.report.optimizedComponents++;
    } else if (result.hasOnPush) {
      this.report.alreadyUsingOnPush++;
    } else {
      this.report.skippedComponents++;
    }

    return result;
  }

  getReport(): OnPushReport {
    return this.report;
  }
}
