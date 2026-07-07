import { Injectable } from '@nestjs/common';
import { RouteTransformer } from './route.transformer';

@Injectable()
export class RouteMigrationService {
  private readonly transformer = new RouteTransformer();

  migrate(source: string): string {
    return this.transformer.transform(source);
  }
}
