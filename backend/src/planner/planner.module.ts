import { Module } from '@nestjs/common';
import { MigrationPlannerService } from './migration-planner.service';

@Module({

providers:[MigrationPlannerService],

exports:[MigrationPlannerService]

})

export class PlannerModule{}