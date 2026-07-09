import { Module } from '@nestjs/common';
import { DeadCodeService } from './dead-code.service';
import { TreeShakingService } from './tree-shaking.service';

@Module({
  providers: [DeadCodeService, TreeShakingService],

  exports: [DeadCodeService],
})
export class DeadCodeModule {}
