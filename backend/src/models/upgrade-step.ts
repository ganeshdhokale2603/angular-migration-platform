export interface UpgradeStep {
  fromVersion: number;

  toVersion: number;

  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
}
