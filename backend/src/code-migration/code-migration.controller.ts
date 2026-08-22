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
    CodeMigrationService
} from './code-migration.service';

import {
    AngularImportAnalyzerService
} from './import-analyzer/angular-import-analyzer.service';

import {
    AnalyzeImportsDto
} from './import-analyzer/dto/analyze-imports.dto';

@ApiTags('Code Migration')
@Controller('code-migration')
export class CodeMigrationController {

    constructor(

        private readonly codeMigrationService:
            CodeMigrationService,

        private readonly angularImportAnalyzer:
            AngularImportAnalyzerService

    ) {}

    @Post('analyze-imports')
    @ApiOperation({
        summary: 'Analyze Angular imports using TypeScript AST'
    })
    @ApiBody({
        type: AnalyzeImportsDto
    })
    @ApiResponse({
        status: 200,
        description: 'Angular import analysis completed successfully.'
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid source code.'
    })
    @ApiResponse({
        status: 500,
        description: 'Import analysis failed.'
    })
    analyzeImports(
        @Body() body: AnalyzeImportsDto
    ) {

        if (
            !body ||
            !body.source ||
            !body.source.trim()
        ) {
            throw new Error(
                'Source code is required.'
            );
        }

        return this.angularImportAnalyzer.analyze(
            body.source
        );

    }

}