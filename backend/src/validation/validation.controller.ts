import {
    Body,
    Controller,
    Post, Get
} from '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody
} from '@nestjs/swagger';

import { ValidationService } from './validation.service';
import { ValidationRequest } from './models/validation-request.model';

@ApiTags('Post Migration Validation')
@Controller('validation')
export class ValidationController {

    constructor(
        private readonly service: ValidationService
    ) {}

    @Post('run')
    @ApiOperation({
        summary: 'Run post migration validation'
    })
    @ApiBody({
        type: ValidationRequest
    })
    @ApiResponse({
        status: 200,
        description: 'Validation completed successfully.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request.'
    })
    run(
        @Body()
        request: ValidationRequest
    ) {

        return this.service.run(
            request.projectPath
        );

    }

    @Get('latest')
latest() {

    return this.service.getLatest();

}

}