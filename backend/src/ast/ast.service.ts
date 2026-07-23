import { Injectable } from '@nestjs/common';

import * as path from 'path';

import { TypeScriptParserService } from './parser/typescript-parser.service';

import { SourceFileVisitorService } from './visitors/source-file-visitor.service';

import { AstAnalysis } from './models/ast-analysis.model';
import { AngularMetadataService } from './visitors/angular-metadata.service';
import { ComponentAnalyzerService } from './visitors/component-analyzer.service';
import { StandaloneTransformerService } from './transformers/standalone-transformer.service';
import { BootstrapTransformerService } from './transformers/bootstrap-transformer.service';
import { TemplateControlFlowTransformerService } from './transformers/template-control-flow-transformer.service';
import { InjectTransformerService } from './transformers/inject-transformer.service';
import { RxjsTransformerService } from './transformers/rxjs-transformer.service';

@Injectable()
export class AstService {

    constructor(

        private readonly parser: TypeScriptParserService,

        private readonly visitor: SourceFileVisitorService,
         private readonly metadata: AngularMetadataService,
         private readonly componentAnalyzer: ComponentAnalyzerService,
         private readonly standaloneTransformer: StandaloneTransformerService,
         private readonly bootstrapTransformer: BootstrapTransformerService,
private readonly controlFlowTransformer: TemplateControlFlowTransformerService,
private readonly injectTransformer: InjectTransformerService,
private readonly rxjsTransformer: RxjsTransformerService,

    ) {}

    analyzeProject(projectPath: string): AstAnalysis {

    const tsConfig = path.join(
        projectPath,
        'tsconfig.json'
    );

    const parserResult =
        this.parser.loadProject(tsConfig);

    const files =
        this.visitor.visit(parserResult.project);

    const analyzedFiles = files.map(file => {
        return this.metadata.analyze(file);
    });

    const components = files
        .map(file => this.componentAnalyzer.analyze(file))
        .filter(
            (component): component is NonNullable<typeof component> =>
                component !== null
        );

    return {

        projectName: path.basename(projectPath),

        totalSourceFiles: analyzedFiles.length,

        totalComponents: components.length,

        totalModules: analyzedFiles.filter(f => f.hasModule).length,

        totalServices: analyzedFiles.filter(f => f.hasInjectable).length,

        totalDirectives: analyzedFiles.filter(f => f.hasDirective).length,

        totalPipes: analyzedFiles.filter(f => f.hasPipe).length,

        files: analyzedFiles,

        components

    };

}

    transformStandalone(projectPath: string) {

    const tsConfig =

        path.join(

            projectPath,

            'tsconfig.json'

        );

    const parser =

        this.parser.loadProject(

            tsConfig

        );

    const transformed =

        this.standaloneTransformer.transform(

            parser.project

        );

    parser.project.saveSync();

    return {

        transformed

    };

}

transformBootstrap(

    projectPath: string

) {

    const parser =

        this.parser.loadProject(

            path.join(

                projectPath,

                'tsconfig.json'

            )

        );

    const transformed =

        this.bootstrapTransformer.transform(

            parser.project

        );

        console.log("Bootstrap transformed:", transformed);

    parser.project.saveSync();

    return {

        transformed

    };

}

async transformTemplates(

    projectPath: string

) {

    const transformed =

        await this.controlFlowTransformer.transform(

            projectPath

        );

    return {

        transformed

    };

}

transformInject(projectPath: string) {

    const parser = this.parser.loadProject(

        path.join(projectPath, 'tsconfig.json')

    );

    const transformed =

        this.injectTransformer.transform(

            parser.project

        );

    parser.project.saveSync();

    return {

        transformed

    };

}

transformRxjs(projectPath: string) {

    const parser = this.parser.loadProject(

        path.join(projectPath, 'tsconfig.json')

    );

    const transformed =

        this.rxjsTransformer.transform(

            parser.project

        );

    parser.project.saveSync();

    return {

        transformed

    };

}


}