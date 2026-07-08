import { Module } from '@nestjs/common';
import { DeadRouteService } from './dead-route.service';

@Module({
  providers: [DeadRouteService],

  exports: [DeadRouteService],
})
export class DeadRouteModule {}
