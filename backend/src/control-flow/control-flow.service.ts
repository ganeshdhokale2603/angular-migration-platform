import { Injectable } from '@nestjs/common';
import { ControlFlowTransformer } from './control-flow.transformer';

@Injectable()
export class ControlFlowService {
  private readonly transformer = new ControlFlowTransformer();

  migrate(template: string): string {
    return this.transformer.transform(template);
  }
}
