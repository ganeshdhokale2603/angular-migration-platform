import { Injectable } from '@nestjs/common';
import { StandaloneTransformer } from './standalone.transformer';

@Injectable()
export class StandaloneService {

  private readonly transformer = new StandaloneTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }
}