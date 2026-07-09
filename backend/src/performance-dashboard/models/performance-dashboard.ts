export interface PerformanceDashboard {
  overallScore: number;

  grade: 'A' | 'B' | 'C' | 'D';

  bundleScore: number;

  changeDetectionScore: number;

  signalScore: number;

  treeShakingScore: number;

  estimatedBundleSize: number;

  estimatedSaving: number;

  recommendations: string[];
}
