import { Module } from '@nestjs/common';
import { RxjsModernizationService } from './rxjs-modernization.service';

@Module({
  providers: [RxjsModernizationService],

  exports: [RxjsModernizationService],
})
export class RxjsModernizationModule {}
