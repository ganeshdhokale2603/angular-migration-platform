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

import {
    InjectMigrationService
} from './inject-migration.service';

import {
    InjectMigrationRequest
} from './models/inject-migration-request.model';

@ApiTags('Inject Migration')
@Controller('inject-migration')
export class InjectMigrationController {

    constructor(
        private readonly service:
            InjectMigrationService
    ) {}

    @Post('scan')
    @ApiOperation({
        summary:
            'Scan project for constructor dependency injection'
    })
    @ApiBody({
        type: InjectMigrationRequest
    })
    @ApiResponse({
        status: 200,
        description:
            'Inject migration scan completed.'
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid migration request.'
    })
    scan(
        @Body()
        body: InjectMigrationRequest
    ) {

        return this.service.scan(
            body.projectPath
        );

    }

}