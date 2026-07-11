import { MigrationHistory } from './migration-history.model';
import { Metric } from './metric.model';
import { ProgressModel } from './progress.model';
import { PerformanceModel } from './performance.model';
import { ChartModel } from './chart.model';
import { ValidationModel } from './validation.model';
import { ReportSummary } from './report-summary.model';
import { PRSummary } from './pr-summary.model';
import { DashboardAIModel } from './dashboard-ai.model';

export interface DashboardModel {

    projectName: string;

    generatedAt: Date;

    history: MigrationHistory[];
    progress: ProgressModel;

    metrics: Metric[];
    performance: PerformanceModel;

charts: ChartModel[];
validation: ValidationModel;

  reports: ReportSummary;

  prSummary: PRSummary;
  ai: DashboardAIModel;

}