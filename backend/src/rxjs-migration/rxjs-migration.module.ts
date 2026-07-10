import { Module } from '@nestjs/common';
import { RxjsMigrationService } from './rxjs-migration.service';
import { RxjsValidatorService } from './rxjs-validator.service';

@Module({
  providers: [RxjsMigrationService, RxjsValidatorService],

  exports: [RxjsMigrationService, RxjsValidatorService],
})
export class RxjsMigrationModule {}
