import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migration/migration.module';
import { GitModule } from './git/git.module';
import { PackageUpgradeModule } from './package-upgrade/package-upgrade.module';
import { CommandExecutorModule } from './command-executor/command-executor.module';
import { UpgradeEngineModule } from './upgrade-engine/upgrade-engine.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';

@Module({
  imports: [
    MigrationModule,
    GitModule,
    PackageUpgradeModule,
    CommandExecutorModule,
    UpgradeEngineModule,
    CheckpointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
