import { Module } from '@nestjs/common';
import { DependencyInjectionService } from './dependency-injection.service';

@Module({
  providers: [DependencyInjectionService],

  exports: [DependencyInjectionService],
})
export class DependencyInjectionModule {}
