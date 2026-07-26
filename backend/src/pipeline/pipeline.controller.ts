import {
    Body,
    Controller,
    Post,Get
} from '@nestjs/common';

import {
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

import { PipelineService } from './pipeline.service';
import { StartPipelineDto } from './dto/start-pipeline.dto';
import { PipelineProgress } from './models/pipeline-progress.model';

@ApiTags('Pipeline')
@Controller('pipeline')
export class PipelineController {

    constructor(

        private readonly service: PipelineService

    ) {}

    @Post('start')
    @ApiOperation({

        summary:
        'Start complete migration pipeline'

    })
    @ApiResponse({

        status: 200,

        description:
        'Pipeline started successfully.'

    })
    async start(

        @Body()

        request: StartPipelineDto

    ) {

        return this.service.start(

            request.projectPath,

            request.targetVersion

        );

    }

    @Get('progress')
       getProgress() {

    return this.service.getProgress();

}

}