import { Module } from '@nestjs/common';
import { UpgradeEngineService } from './upgrade-engine.service';

@Module({
  providers: [UpgradeEngineService],
  exports: [UpgradeEngineService],
})
export class UpgradeEngineModule {}