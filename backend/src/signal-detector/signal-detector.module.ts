import { Module } from '@nestjs/common';
import { SignalDetectorService } from './signal-detector.service';
import { SignalDetectorController } from './signal-detector.controller';

@Module({
  controllers: [SignalDetectorController],
  providers: [SignalDetectorService],
  exports: [SignalDetectorService],
})
export class SignalDetectorModule {}
