import { Injectable } from '@nestjs/common';
import { MaterialMigrationTransformer } from './material-migration.transformer';

@Injectable()
export class MaterialMigrationService {
  private readonly transformer = new MaterialMigrationTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }
}
