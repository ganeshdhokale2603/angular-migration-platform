import { Injectable } from '@nestjs/common';
import { DeadCodeReport } from './dead-code.report';

@Injectable()
export class TreeShakingService {

  calculate(
    report: DeadCodeReport
  ): number {

    const penalties =

      report.unusedImports +

      report.unusedProviders +

      report.unusedComponents +

      report.unusedServices;

    const score =
      Math.max(0, 100 - penalties);

    return score;

  }

}