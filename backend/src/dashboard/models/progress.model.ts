export interface ProgressModel {

  filesScanned: number;

  filesMigrated: number;

  remainingFiles: number;

  migrationPercentage: number;

  completed: boolean;

}