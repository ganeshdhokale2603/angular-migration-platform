import { Module } from '@nestjs/common';
import { PerformanceDashboardService } from './performance-dashboard.service';

@Module({
  providers: [PerformanceDashboardService],

  exports: [PerformanceDashboardService],
})
export class PerformanceDashboardModule {}
