export interface MaterialScanReport {
  materialVersion: string;

  totalMaterialImports: number;

  legacyImports: number;

  mdcImports: number;

  componentsUsingMaterial: number;

  materialModules: string[];

}
