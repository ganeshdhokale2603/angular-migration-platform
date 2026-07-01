import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migration/migration.module';
import { GitModule } from './git/git.module';

@Module({
  imports: [MigrationModule, GitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
