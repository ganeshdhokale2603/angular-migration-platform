import { Injectable } from '@nestjs/common';
import { BootstrapTransformer } from './bootstrap.transformer';

@Injectable()
export class BootstrapService {

  private readonly transformer = new BootstrapTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }

}