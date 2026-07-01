import { Module } from '@nestjs/common';

import { ScannerService } from './scanner.service';
import { DependencyService } from './dependency/dependency.service';
import { RuleEngineService } from './rules/rule-engine.service';

@Module({
  providers: [ScannerService, DependencyService, RuleEngineService],

  exports: [ScannerService, DependencyService, RuleEngineService],
})
export class ScannerModule {}
