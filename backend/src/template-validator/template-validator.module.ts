import { Module } from '@nestjs/common';
import { TemplateValidatorService } from './template-validator.service';

@Module({
  providers: [TemplateValidatorService],

  exports: [TemplateValidatorService],
})
export class TemplateValidatorModule {}
