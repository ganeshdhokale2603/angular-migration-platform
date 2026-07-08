import { Module } from '@nestjs/common';
import { CircularRouteService } from './circular-route.service';

@Module({
  providers: [CircularRouteService],

  exports: [CircularRouteService],
})
export class CircularRouteModule {}
