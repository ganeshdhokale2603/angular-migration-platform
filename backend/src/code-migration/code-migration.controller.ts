import {
  BadRequestException,
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

import {
  ImportTransformerService
} from './import-analyzer/import-transformer.service';

import { TransformImportsDto } from './import-analyzer/dto/transform-imports.dto';

@ApiTags('Code Migration')
@Controller('code-migration')
export class CodeMigrationController {

    constructor(

        private readonly codeMigrationService:
            CodeMigrationService,

        private readonly angularImportAnalyzer:
            AngularImportAnalyzerService,
            private readonly importMigrationRule:
        ImportMigrationRuleService,
        private readonly importTransformer:
    ImportTransformerService


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

@Post('transform-imports')
@ApiOperation({
  summary: 'Transform Angular/RxJS imports'
})
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      source: {
        type: 'string',
        example:
          "import { Observable } from 'rxjs/Observable';\nimport { Subject } from 'rxjs/Subject';"
      }
    },
    required: ['source']
  }
})
@ApiResponse({
  status: 201,
  description: 'Import transformation completed successfully.'
})
transformImports(
  @Body() body: { source: string }
) {

  console.log(
    'TRANSFORM IMPORTS BODY:',
    body
  );

  if (!body) {
    throw new BadRequestException(
      'Request body is required.'
    );
  }

  if (
    typeof body.source !== 'string' ||
    !body.source.trim()
  ) {
    throw new BadRequestException(
      'source must be a non-empty string.'
    );
  }

  console.log(
    'SOURCE RECEIVED:',
    body.source
  );

  return this.importTransformer.transform(
    body.source
  );
}


}