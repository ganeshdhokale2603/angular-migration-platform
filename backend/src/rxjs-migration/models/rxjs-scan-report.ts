export interface RxjsScanReport {
  totalRxjsImports: number;

  observableCount: number;

  subjectCount: number;

  behaviorSubjectCount: number;

  replaySubjectCount: number;

  asyncSubjectCount: number;

  subscriptionCount: number;

  deprecatedOperators: string[];
}
