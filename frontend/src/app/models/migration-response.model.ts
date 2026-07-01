import { MigrationIssue } from './migration-issue.model';

export interface MigrationResponse {

  jobId: string;

  status: string;

  message: string;

  projectInfo: any;
  issues: MigrationIssue[];

}
