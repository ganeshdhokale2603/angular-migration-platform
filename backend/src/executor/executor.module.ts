import { Module } from '@nestjs/common';
import { MigrationExecutorService } from './migration-executor.service';

@Module({
  providers: [MigrationExecutorService],
  exports: [MigrationExecutorService]
})
export class ExecutorModule {}