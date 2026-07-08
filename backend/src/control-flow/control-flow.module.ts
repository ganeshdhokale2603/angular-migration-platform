import { Module } from '@nestjs/common';
import { ControlFlowService } from './control-flow.service';

@Module({
  providers: [ControlFlowService],

  exports: [ControlFlowService],
})
export class ControlFlowModule {}
