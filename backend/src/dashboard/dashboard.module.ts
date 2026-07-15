import { Module } from '@nestjs/common';

import { DashboardController } from './dashboard.controller';

import { DashboardService } from './dashboard.service';
import { ReportModule } from '../report/report.module';
import { AIAdvisorModule } from '../ai-advisor/ai-advisor.module';
import { ValidatorModule } from '../validator/validator.module';
import { PrGeneratorModule } from '../pr-generator/pr-generator.module';

@Module({
    imports: [
        ReportModule,
        AIAdvisorModule,
        ValidatorModule,
        PrGeneratorModule
    ],

    controllers: [

        DashboardController

    ],

    providers: [

        DashboardService

    ],

    exports: [

        DashboardService

    ]

})

export class DashboardModule { }