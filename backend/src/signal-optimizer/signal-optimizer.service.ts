import { Injectable } from '@nestjs/common';
import { SignalTransformer } from './signal.transformer';
import { SignalReport } from './signal.report';

@Injectable()
export class SignalOptimizerService {
  private readonly transformer = new SignalTransformer();

  private readonly report: SignalReport = {
    filesScanned: 0,

    behaviorSubjectsFound: 0,

    signalsCreated: 0,

    computedSuggestions: 0,

    effectSuggestions: 0,
  };

  optimize(source: string) {
    const result = this.transformer.transform(source);

    this.report.filesScanned++;

    this.report.behaviorSubjectsFound += result.report.behaviorSubjects;

    this.report.signalsCreated += result.report.signals;

    this.report.computedSuggestions += result.report.computed;

    this.report.effectSuggestions += result.report.effects;

    return result;
  }

  getReport(): SignalReport {
    return this.report;
  }
}
