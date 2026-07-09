export interface BundleAnalysis {
  estimatedBundleSize: number;

  estimatedSaving: number;

  lazyLoadingCoverage: number;

  standaloneCoverage: number;

  signalCoverage: number;

  treeShakingScore: number;

  performanceScore: number;
}
