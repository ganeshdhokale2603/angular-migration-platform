import { Module } from '@nestjs/common';

import { AstService } from './ast.service';

import { AstController } from './ast.controller';

import { TypeScriptParserService } from './parser/typescript-parser.service';

import { SourceFileVisitorService } from './visitors/source-file-visitor.service';
import { AngularMetadataService } from './visitors/angular-metadata.service';
import { ComponentAnalyzerService } from './visitors/component-analyzer.service';
import { StandaloneTransformerService } from './transformers/standalone-transformer.service';
import { BootstrapTransformerService } from './transformers/bootstrap-transformer.service';
import { TemplateControlFlowTransformerService } from './transformers/template-control-flow-transformer.service';
import { InjectTransformerService } from './transformers/inject-transformer.service';
import { RxjsTransformerService } from './transformers/rxjs-transformer.service';

@Module({

    controllers: [

        AstController

    ],

    providers: [

        AstService,

        TypeScriptParserService,

        SourceFileVisitorService,
        AngularMetadataService,
ComponentAnalyzerService,
StandaloneTransformerService,
BootstrapTransformerService,
TemplateControlFlowTransformerService,
InjectTransformerService,
RxjsTransformerService
    ],

    exports: [

        AstService

    ]

})

export class AstModule {}