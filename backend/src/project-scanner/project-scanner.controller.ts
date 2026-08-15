import {

    Body,

    Controller,

    Post

} from '@nestjs/common';

import {

    ApiBody,

    ApiOperation,

    ApiResponse,

    ApiTags

} from '@nestjs/swagger';

import { ProjectScannerService } from './project-scanner.service';

import { ScanRequest } from './models/scan-request.model';

@ApiTags('Project Scanner')

@Controller('scanner')

export class ProjectScannerController {

    constructor(

        private readonly service: ProjectScannerService

    ) {}

    @Post('scan')

    @ApiOperation({

        summary:

            'Scan Angular project'

    })

    @ApiBody({

        type: ScanRequest

    })

    @ApiResponse({

        status: 200,

        description:

            'Project scanned successfully.'

    })

    scan(

        @Body()

        body: ScanRequest

    ) {

        return this.service.scan(

            body.projectPath

        );

    }

}