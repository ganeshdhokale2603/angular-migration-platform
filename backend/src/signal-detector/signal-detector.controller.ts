import { Controller, Get } from '@nestjs/common';

@Controller('signals')
export class SignalDetectorController {
  @Get()
  test() {
    return {
      message: 'Signal Detector Ready',
    };
  }
}
