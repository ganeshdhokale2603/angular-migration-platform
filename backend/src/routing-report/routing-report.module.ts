import { Module } from '@nestjs/common';
import { RoutingReportService } from './routing-report.service';

@Module({
  providers: [RoutingReportService],

  exports: [RoutingReportService],
})
export class RoutingReportModule {}
