import { Injectable } from '@nestjs/common';
import { MaterialMigrationTransformer } from './material-migration.transformer';
import { ThemeTransformer } from './theme.transformer';
import { TypographyTransformer } from './typography.transformer';
import { IconTransformer } from './icon.transformer';

@Injectable()
export class MaterialMigrationService {
  private readonly transformer = new MaterialMigrationTransformer();
  private readonly theme = new ThemeTransformer();
  private readonly typography = new TypographyTransformer();

  private readonly icon = new IconTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }

  migrateTheme(source: string) {
    return this.theme.transform(source);
  }

  migrateTypography(source: string) {
    return this.typography.transform(source);
  }

  migrateIcons(source: string) {
    return this.icon.transform(source);
  }
}
