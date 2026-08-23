export interface ImportTransformationChange {
  originalModule: string;
  targetModule: string;
  imports: string[];
}

export interface ImportTransformationResult {
  source: string;
  changed: boolean;
  changes: ImportTransformationChange[];
}