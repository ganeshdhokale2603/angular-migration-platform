import { Injectable } from '@nestjs/common';
import { RouteOptimizerTransformer } from './route-optimizer.transformer';

@Injectable()
export class RouteOptimizerService {
  private readonly transformer = new RouteOptimizerTransformer();

  optimize(source: string) {
    return this.transformer.optimize(source);
  }
}
