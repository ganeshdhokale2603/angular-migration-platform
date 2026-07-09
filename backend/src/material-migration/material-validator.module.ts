import { Module } from '@nestjs/common';
import { MaterialValidatorService } from './material-validator.service';

@Module({
  providers: [MaterialValidatorService],

  exports: [MaterialValidatorService],
})
export class MaterialValidatorModule {}
