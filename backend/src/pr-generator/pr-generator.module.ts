import { Module } from '@nestjs/common';
import { PrGeneratorService } from './pr-generator.service';

@Module({
  providers: [PrGeneratorService],
  exports: [PrGeneratorService],
})
export class PrGeneratorModule {}