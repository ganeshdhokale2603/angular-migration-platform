export interface MaterialValidationReport {
  totalLegacyComponents: number;

  totalMdcComponents: number;

  compatibilityScore: number;

  recommendations: string[];
}
