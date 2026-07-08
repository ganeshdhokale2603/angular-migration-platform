import { Injectable } from '@nestjs/common';
import { CircularRouteAnalyzer } from './circular-route.analyzer';

@Injectable()
export class CircularRouteService {
  private readonly analyzer = new CircularRouteAnalyzer();

  analyze(source: string) {
    return this.analyzer.analyze(source);
  }
}
