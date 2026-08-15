import { Module } from '@nestjs/common';
import { StandaloneService } from './standalone.service';
import { StandaloneController } from './standalone.controller';
import { NgModuleCleanupService } from 'src/code-migration/standalone/ng-module-cleanup.service';
import { StandaloneValidationService } from './standalone-validation.service';

@Module({
  controllers: [

        StandaloneController

    ],
  providers: [StandaloneService, NgModuleCleanupService, StandaloneValidationService],
  exports: [StandaloneService, StandaloneValidationService],
})
export class StandaloneModule {}