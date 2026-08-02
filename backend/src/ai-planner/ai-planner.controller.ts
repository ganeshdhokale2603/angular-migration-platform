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

import { AIPlannerService } from './ai-planner.service';
import { PlannerRequest } from './models/planner-request.model';

@ApiTags('AI Migration Planner')
@Controller('planner')
export class AIPlannerController {

    constructor(

        private readonly service: AIPlannerService

    ) {}

    @Post('plan')
    @ApiOperation({
        summary: 'Generate AI migration plan'
    })
    @ApiBody({
        type: PlannerRequest
    })
    @ApiResponse({
        status: 200
    })
    async plan(

        @Body()

        body: PlannerRequest

    ) {

        return this.service.generate(

            body.projectPath,

            body.sourceVersion,

            body.targetVersion

        );

    }

}