import {
    Controller,
    Post,
    Body
} from '@nestjs/common';

import { AiService } from './ai.service';
import { AiRequestDto } from './dto/ai-request.dto';

@Controller('ai')
export class AiController {

    constructor(

        private readonly service: AiService

    ) {}

    @Post('analyze')
    analyze(

        @Body()
        request: AiRequestDto

    ) {

        return this.service.analyze(

            request.projectPath

        );

    }

}