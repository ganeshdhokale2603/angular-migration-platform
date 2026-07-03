import { Module } from '@nestjs/common';
import { PackageUpgradeService } from './package-upgrade.service';

@Module({
  providers: [PackageUpgradeService],
  exports: [PackageUpgradeService]
})
export class PackageUpgradeModule {}