export interface MigrationDashboard {
  projectName: string;

  angularVersion: string;

  targetVersion: string;

  totalFiles: number;

  migratedFiles: number;

  templatesMigrated: number;

  validationPassed: boolean;

  confidenceScore: number;

  risk: 'LOW' | 'MEDIUM' | 'HIGH';

  generatedAt: Date;
}
