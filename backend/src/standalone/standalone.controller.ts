import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';

import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

import { StandaloneService } from './standalone.service';
import { StandaloneRequest } from './models/standalone-request.model';

import {
    StandaloneValidationService
} from './standalone-validation.service';

@ApiTags('Standalone Migration')
@Controller('standalone')
export class StandaloneController {

    constructor(
        private readonly standaloneService:
            StandaloneService,
            private readonly validationService:
        StandaloneValidationService
    ) {}

    @Post('migrate')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Convert Angular components to standalone components'
    })
    @ApiBody({
        type: StandaloneRequest
    })
    @ApiResponse({
        status: 200,
        description:
            'Standalone component migration completed.'
    })
    @ApiResponse({
        status: 400,
        description:
            'Invalid migration request.'
    })
    async migrate(
        @Body()
        body: StandaloneRequest
    ) {

        return this.standaloneService.migrateProject(
            body.projectPath
        );

    }

    @Post('validate')
@ApiOperation({
    summary:
        'Validate standalone migration'
})
@ApiBody({
    schema: {
        type: 'object',
        properties: {
            projectPath: {
                type: 'string',
                example:
                    'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app-standalone-test'
            }
        },
        required: [
            'projectPath'
        ]
    }
})
@ApiResponse({
    status: 200,
    description:
        'Standalone migration validation completed.'
})
validate(
    @Body()
    body: {
        projectPath: string;
    }
) {

    return this.validationService.validate(
        body.projectPath
    );

}

}