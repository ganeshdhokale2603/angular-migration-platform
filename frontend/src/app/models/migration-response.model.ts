import { MigrationIssue } from './migration-issue.model';
import { MigrationPlan } from './migration-plan.model';
import { ScanResult } from './scan-result.model';

export interface MigrationResponse {

  jobId: string;

  status: string;

  message: string;

  projectInfo: any;
  issues: MigrationIssue[];

   scan: ScanResult;

  plan:MigrationPlan;

}
