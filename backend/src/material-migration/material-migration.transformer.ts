export class MaterialMigrationTransformer {
  private readonly replacements: Record<string, string> = {
    MatLegacyButtonModule: 'MatButtonModule',

    MatLegacyInputModule: 'MatInputModule',

    MatLegacyDialogModule: 'MatDialogModule',

    MatLegacyTableModule: 'MatTableModule',

    MatLegacySelectModule: 'MatSelectModule',

    MatLegacyCheckboxModule: 'MatCheckboxModule',

    MatLegacyRadioModule: 'MatRadioModule',

    MatLegacyToolbarModule: 'MatToolbarModule',

    MatLegacyCardModule: 'MatCardModule',

    MatLegacyIconModule: 'MatIconModule',

    MatLegacyMenuModule: 'MatMenuModule',

    MatLegacyPaginatorModule: 'MatPaginatorModule',

    MatLegacySortModule: 'MatSortModule',

    MatLegacySnackBarModule: 'MatSnackBarModule',

    MatLegacyTabsModule: 'MatTabsModule',

    MatLegacyTooltipModule: 'MatTooltipModule',
  };

  transform(source: string): string {
    let updated = source;

    for (const legacy in this.replacements) {
      updated = updated.replace(
        new RegExp(legacy, 'g'),

        this.replacements[legacy],
      );

      updated = updated.replace(
        /@angular\/material\/legacy-button/g,
        '@angular/material/button',
      );

      updated = updated.replace(
        /@angular\/material\/legacy-input/g,
        '@angular/material/input',
      );

      updated = updated.replace(
        /@angular\/material\/legacy-dialog/g,
        '@angular/material/dialog',
      );

      updated = updated.replace(
        /@angular\/material\/legacy-table/g,
        '@angular/material/table',
      );

      updated = updated.replace(
        /@angular\/material\/legacy-select/g,
        '@angular/material/select',
      );

      updated = updated.replace(
        /@angular\/material\/legacy-checkbox/g,
        '@angular/material/checkbox',
      );
    }

    return updated;
  }
}
