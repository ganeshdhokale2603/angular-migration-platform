export interface MigrationReport {
  projectName: string;

  filesScanned: number;

  filesMigrated: number;

  components: number;

  modules: number;

  services: number;

  generatedAt: Date;

  validation?: ValidationResult;

  templateValidation?: any[];

  confidenceScore?: number;
}

export interface ValidationResult {
  npmInstall: boolean;
  build: boolean;
  lint: boolean;
  logs: string[];
}
