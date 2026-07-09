import { Module } from '@nestjs/common';
import { SignalOptimizerService } from './signal-optimizer.service';

@Module({
  providers: [SignalOptimizerService],

  exports: [SignalOptimizerService],
})
export class SignalOptimizerModule {}
