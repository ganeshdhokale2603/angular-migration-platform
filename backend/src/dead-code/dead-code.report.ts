export interface DeadCodeReport {
  filesScanned: number;

  unusedImports: number;

  unusedProviders: number;

  unusedComponents: number;

  unusedServices: number;

  treeShakingScore: number;
}
