import { Module } from '@nestjs/common';
import { MaterialMigrationService } from './material-migration.service';

@Module({
  providers: [MaterialMigrationService],

  exports: [MaterialMigrationService],
})
export class MaterialMigrationModule {}
