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

import {
    ImportMigrationRuleService
} from './import-analyzer/import-migration-rule.service';
import {
    AnalyzeImportRuleDto
} from './import-analyzer/dto/analyze-import-rule.dto';

@ApiTags('Code Migration')
@Controller('code-migration')
export class CodeMigrationController {

    constructor(

        private readonly codeMigrationService:
            CodeMigrationService,

        private readonly angularImportAnalyzer:
            AngularImportAnalyzerService,
            private readonly importMigrationRule:
        ImportMigrationRuleService

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

    @Post('analyze-import-rule')
@ApiOperation({
    summary: 'Analyze Angular import migration rule'
})
@ApiBody({
    type: AnalyzeImportRuleDto
})
@ApiResponse({
    status: 200,
    description: 'Import migration rule analyzed successfully.'
})
analyzeImportRule(
    @Body() body: AnalyzeImportRuleDto
) {

    return this.importMigrationRule.analyze(
        body.module,
        body.importName
    );

}

}