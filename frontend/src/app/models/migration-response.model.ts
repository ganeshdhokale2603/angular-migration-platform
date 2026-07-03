import { MigrationIssue } from './migration-issue.model';
import { MigrationPlan } from './migration-plan.model';
import { ScanResult } from './scan-result.model';
import { ExecutionResult } from './execution-result.model';

export interface MigrationResponse {

  jobId: string;

  status: string;

  message: string;

  projectInfo: any;
  issues: MigrationIssue[];

   scan: ScanResult;

  plan:MigrationPlan;

   execution:ExecutionResult;

   packageUpgrade: PackageUpgrade;

}

export interface PackageUpgrade {

    status:string;

    targetVersion:string;

    upgradedPackages:string[];

}
