export interface TemplateChange {
  file: string;

  rule: string;

  before: string;

  after: string;

  line?: number;
}
