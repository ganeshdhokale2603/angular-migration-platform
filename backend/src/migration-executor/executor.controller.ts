import {
    Body,
    Controller,
    Post,Get
} from '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody
} from '@nestjs/swagger';

import { ExecutorService } from './executor.service';
import { ExecutorRequest } from './models/executor-request.model';

@ApiTags('Migration Executor')
@Controller('executor')
export class ExecutorController {

    constructor(
        private readonly service: ExecutorService
    ) {}

    @Post('execute')
    @ApiOperation({
        summary: 'Execute Angular migration rules'
    })
    @ApiBody({
        type: ExecutorRequest
    })
    @ApiResponse({
        status: 200,
        description: 'Migration executed successfully.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request.'
    })
    execute(
        @Body()
        body: ExecutorRequest
    ) {
        return this.service.execute(
            body.projectPath,
            body.sourceVersion,
            body.targetVersion,
            body.rules
        );
    }

    @Get('summary')
@ApiOperation({

    summary: 'Get last migration summary'

})
@ApiResponse({

    status: 200,

    description: 'Returns latest migration result.'

})
summary() {

    return this.service.getSummary();

}

}