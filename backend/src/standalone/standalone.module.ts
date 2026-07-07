import { Module } from '@nestjs/common';
import { StandaloneService } from './standalone.service';

@Module({
  providers: [StandaloneService],
  exports: [StandaloneService],
})
export class StandaloneModule {}