import { Module } from '@nestjs/common';
import { AngularTemplateTransformerService } from './angular-template-transformer.service';

@Module({
  providers: [AngularTemplateTransformerService],
  exports: [AngularTemplateTransformerService],
})
export class AngularTemplateTransformerModule {}