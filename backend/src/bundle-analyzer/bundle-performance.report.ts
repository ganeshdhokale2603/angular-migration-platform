export interface BundlePerformanceReport {

  estimatedBundleSize: number;

  estimatedSaving: number;

  lazyLoadingCoverage: number;

  standaloneCoverage: number;

  signalCoverage: number;

  treeShakingScore: number;

  performanceScore: number;

}