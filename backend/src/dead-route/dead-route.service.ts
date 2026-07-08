import { Injectable } from '@nestjs/common';
import { DeadRouteDetector } from './dead-route.detector';

@Injectable()
export class DeadRouteService {
  private readonly detector = new DeadRouteDetector();

  analyze(source: string) {
    return this.detector.analyze(source);
  }
}
