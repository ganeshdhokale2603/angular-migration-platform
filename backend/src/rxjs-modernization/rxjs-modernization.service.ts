import { Injectable } from '@nestjs/common';
import { RxjsModernizationTransformer } from './rxjs-modernization.transformer';

@Injectable()
export class RxjsModernizationService {
  private readonly transformer = new RxjsModernizationTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }
}
