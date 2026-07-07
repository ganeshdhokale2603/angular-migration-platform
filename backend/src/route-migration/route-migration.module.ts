import { Module } from '@nestjs/common';
import { RouteMigrationService } from './route-migration.service';

@Module({
  providers: [RouteMigrationService],
  exports: [RouteMigrationService],
})
export class RouteMigrationModule {}