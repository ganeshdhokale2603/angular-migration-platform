import { Module } from '@nestjs/common';

import { MigrationEngineController } from './migration-engine.controller';
import { MigrationEngineService } from './migration-engine.service';
import { PipelineService } from './pipeline/pipeline.service';
import { StageExecutor } from './pipeline/stage.executor';
import { ProjectDiscoveryService } from './services/project-discovery.service';
import { StageRegistry } from './registry/stage.registry';
import { EventBusService } from './events/event-bus.service';
import { RollbackModule } from '../rollback/rollback.module';
import { ReportModule } from '../report/report.module';
import { ValidatorModule } from '../validator/validator.module';
import { AIAdvisorModule } from '../ai-advisor/ai-advisor.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PrGeneratorModule } from '../pr-generator/pr-generator.module';

@Module({

    imports:[

        RollbackModule,

        ReportModule,

        ValidatorModule,

        AIAdvisorModule,

        DashboardModule,

        PrGeneratorModule

        ],

    controllers: [
        MigrationEngineController
    ],

    providers: [

        MigrationEngineService,

        PipelineService,

        StageExecutor,

        ProjectDiscoveryService,
        StageRegistry,
        EventBusService

    ],

    exports: [

        MigrationEngineService

    ]

})
export class MigrationEngineModule { }