export interface LazyLoadingReport {
  routesScanned: number;
  loadChildrenFound: number;
  loadComponentGenerated: number;
  skipped: number;
}