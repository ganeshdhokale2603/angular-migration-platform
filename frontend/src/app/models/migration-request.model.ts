export interface MigrationRequest {

  repositoryUrl: string;

  fromVersion: number;

  toVersion: number;

  outputFolder: string;

}
