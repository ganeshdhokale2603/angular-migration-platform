export interface ThemeMigrationResult {
  source: string;

  migrated: boolean;

  changes: number;
}

export class ThemeTransformer {
  transform(source: string): ThemeMigrationResult {
    let updated = source;

    let changes = 0;

    if (updated.includes("@import '~@angular/material/theming'")) {
      updated = updated.replace(
        "@import '~@angular/material/theming';",
        "@use '@angular/material' as mat;",
      );

      changes++;
    }

    if (updated.includes('@include mat-core()')) {
      updated = updated.replace('@include mat-core();', '');

      changes++;
    }

    updated = updated.replaceAll('mat-palette(', 'mat.define-palette(');

    updated = updated.replaceAll('$mat-indigo', 'mat.$indigo-palette');

    updated = updated.replaceAll('$mat-pink', 'mat.$pink-palette');

    updated = updated.replaceAll('mat-light-theme(', 'mat.define-light-theme(');

    updated = updated.replaceAll(
      '@include angular-material-theme',
      '@include mat.all-component-themes',
    );

    return {
      source: updated,

      migrated: changes > 0,

      changes,
    };
  }
}
