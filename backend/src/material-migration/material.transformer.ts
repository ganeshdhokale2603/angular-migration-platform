export interface MaterialMigrationResult {
  source: string;

  legacyImports: number;

  migratedImports: number;
}

export class MaterialTransformer {
  transform(source: string): MaterialMigrationResult {
    let migratedImports = 0;

    let legacyImports = 0;

    const replacements: Record<string, string> = {
      MatLegacyButtonModule: 'MatButtonModule',

      MatLegacyDialogModule: 'MatDialogModule',

      MatLegacyInputModule: 'MatInputModule',

      MatLegacyTableModule: 'MatTableModule',

      MatLegacySelectModule: 'MatSelectModule',

      MatLegacyMenuModule: 'MatMenuModule',

      MatLegacyToolbarModule: 'MatToolbarModule',

      MatLegacyCheckboxModule: 'MatCheckboxModule',

      MatLegacyRadioModule: 'MatRadioModule',

      MatLegacySlideToggleModule: 'MatSlideToggleModule',
    };

    let updated = source;

    Object.entries(replacements).forEach(([legacy, modern]) => {
      if (updated.includes(legacy)) {
        legacyImports++;

        migratedImports++;

        updated = updated.replaceAll(legacy, modern);
      }
    });

    updated = updated.replaceAll(
      '@angular/material/legacy-',
      '@angular/material/',
    );

    return {
      source: updated,

      legacyImports,

      migratedImports,
    };
  }
}
