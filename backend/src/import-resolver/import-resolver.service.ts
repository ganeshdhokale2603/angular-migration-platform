import { Injectable } from '@nestjs/common';

@Injectable()
export class ImportResolverService {
  resolve(template: string): string[] {
    const imports = new Set<string>();

    if (template.includes('mat-button')) {
      imports.add('MatButtonModule');
    }

    if (template.includes('mat-icon')) {
      imports.add('MatIconModule');
    }

    if (template.includes('mat-card')) {
      imports.add('MatCardModule');
    }

    if (template.includes('mat-form-field')) {
      imports.add('MatFormFieldModule');
    }

    if (template.includes('mat-input')) {
      imports.add('MatInputModule');
    }

    if (template.includes('mat-table')) {
      imports.add('MatTableModule');
    }

    if (template.includes('router-outlet')) {
      imports.add('RouterModule');
    }

    if (template.includes('*ngIf')) {
      imports.add('CommonModule');
    }

    if (template.includes('*ngFor')) {
      imports.add('CommonModule');
    }

    return [...imports];
  }
}
