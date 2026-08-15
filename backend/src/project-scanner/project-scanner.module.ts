import { Module } from '@nestjs/common';

import { ProjectScannerController } from './project-scanner.controller';

import { ProjectScannerService } from './project-scanner.service';

@Module({

    controllers: [

        ProjectScannerController

    ],

    providers: [

        ProjectScannerService

    ],

    exports: [

        ProjectScannerService

    ]

})

export class ProjectScannerModule {}