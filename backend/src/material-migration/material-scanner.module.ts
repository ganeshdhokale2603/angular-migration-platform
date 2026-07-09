import { Module } from '@nestjs/common';
import { MaterialScannerService } from './material-scanner.service';

@Module({
  providers: [MaterialScannerService],

  exports: [MaterialScannerService],
})
export class MaterialScannerModule {}
