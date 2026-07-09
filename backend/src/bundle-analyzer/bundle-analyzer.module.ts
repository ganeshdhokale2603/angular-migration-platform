import { Module } from '@nestjs/common';
import { BundleAnalyzerService } from './bundle-analyzer.service';

@Module({
  providers: [BundleAnalyzerService],

  exports: [BundleAnalyzerService],
})
export class BundleAnalyzerModule {}
