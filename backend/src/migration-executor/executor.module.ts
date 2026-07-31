import { Module } from '@nestjs/common';

import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';
import { ReportService } from './report.service';
import { LoggerService } from './logger.service';

@Module({

    controllers: [

        ExecutorController

    ],

    providers: [

        ExecutorService,

        ReportService,

        LoggerService

    ],

    exports: [

        ExecutorService

    ]

})

export class ExecutorModule {}