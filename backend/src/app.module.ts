import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [MigrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
