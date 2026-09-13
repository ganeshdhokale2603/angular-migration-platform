export interface TemplateTransformationChange {
  ruleId: string;
  sourceSyntax: string;
  targetSyntax: string;
  description: string;
}

export interface TemplateTransformationResult {
  source: string;
  transformed: string;
  changed: boolean;
  changes: TemplateTransformationChange[];
}