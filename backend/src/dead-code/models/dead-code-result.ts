export interface DeadCodeResult {
  file: string;

  unusedImports: number;

  unusedProviders: number;

  unusedComponents: number;

  unusedServices: number;
}
