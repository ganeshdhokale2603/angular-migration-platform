import { Module } from '@nestjs/common';

import { ScannerService } from './scanner.service';
import { DependencyService } from './dependency/dependency.service';

@Module({
  providers: [ScannerService, DependencyService],

  exports: [ScannerService, DependencyService],
})
export class ScannerModule {}
