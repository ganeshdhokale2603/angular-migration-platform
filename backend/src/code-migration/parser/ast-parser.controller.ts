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

import { AstParserService } from './ast-parser.service';
import { AstRequest } from './models/ast-request.model';

@ApiTags('Code Migration - AST Parser')
@Controller('code-migration/parser')
export class AstParserController {

    constructor(

        private readonly astParserService: AstParserService

    ) {}

    @Post('analyze')
    @ApiOperation({

        summary: 'Analyze a TypeScript file using AST'

    })
    @ApiBody({

        type: AstRequest

    })
    @ApiResponse({

        status: 200,

        description: 'AST analysis completed successfully.'

    })
    analyze(

        @Body()

        body: AstRequest

    ) {

        return this.astParserService.analyze(

            body.filePath

        );

    }

}