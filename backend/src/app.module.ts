import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migration/migration.module';
import { GitModule } from './git/git.module';
import { PackageUpgradeModule } from './package-upgrade/package-upgrade.module';

@Module({
  imports: [MigrationModule, GitModule, PackageUpgradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
