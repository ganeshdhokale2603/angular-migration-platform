export interface ValidationModel {

  buildPassed: boolean;

  lintPassed: boolean;

  npmInstallPassed: boolean;

  logs: string[];

}