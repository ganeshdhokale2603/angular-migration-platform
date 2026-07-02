import { MigrationIssue } from './migration-issue.model';

export interface ScanResult {

  statistics: any;

  files: any;

  dependencyGraph: any[];

  issues: MigrationIssue[];

}