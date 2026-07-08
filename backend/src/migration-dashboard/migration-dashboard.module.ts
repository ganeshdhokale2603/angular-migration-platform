import { Module } from '@nestjs/common';
import { MigrationDashboardService } from './migration-dashboard.service';

@Module({
  providers: [MigrationDashboardService],

  exports: [MigrationDashboardService],
})
export class MigrationDashboardModule {}
