import { Injectable } from '@nestjs/common';

import { RuleRegistryService } from '../registry/rule-registry.service';
import { RuleExecutionResult } from '../models/rule-execution-result.model';

import { StandaloneTransformerService } from '../../ast/transformers/standalone-transformer.service';
import { BootstrapTransformerService } from '../../ast/transformers/bootstrap-transformer.service';
import { TemplateControlFlowTransformerService } from '../../ast/transformers/template-control-flow-transformer.service';
import { InjectTransformerService } from '../../ast/transformers/inject-transformer.service';
import { RxjsTransformerService } from '../../ast/transformers/rxjs-transformer.service';

import { TypeScriptParserService } from '../../ast/parser/typescript-parser.service';

import * as path from 'path';

@Injectable()
export class RuleExecutorService {

    constructor(

        private readonly registry: RuleRegistryService,

        private readonly parser: TypeScriptParserService,

        private readonly standalone: StandaloneTransformerService,

        private readonly bootstrap: BootstrapTransformerService,

        private readonly template: TemplateControlFlowTransformerService,

        private readonly inject: InjectTransformerService,

        private readonly rxjs: RxjsTransformerService

    ) {}

    async execute(

        projectPath: string,

        version: number

    ): Promise<RuleExecutionResult> {

        const ruleSet =

            await this.registry.get(version);

        const project =

            this.parser.loadProject(

                path.join(

                    projectPath,

                    'tsconfig.json'

                )

            ).project;

        let executed = 0;

        let skipped = 0;

        let transformedFiles = 0;

        const executedRules: string[] = [];

        for (const rule of ruleSet.rules) {

            if (!rule.action.enabled) {

                skipped++;

                continue;

            }

            let count = 0;

            switch (rule.action.transformer) {

                case 'StandaloneTransformerService':

                    count = this.standalone.transform(project);

                    break;

                case 'BootstrapTransformerService':

                    count = this.bootstrap.transform(project);

                    break;

                case 'TemplateControlFlowTransformerService':

                    count = await this.template.transform(projectPath);

                    break;

                case 'InjectTransformerService':

                    count = this.inject.transform(project);

                    break;

                case 'RxjsTransformerService':

                    count = this.rxjs.transform(project);

                    break;

            }

            executed++;

            transformedFiles += count;

            executedRules.push(rule.name);

        }

        project.saveSync();

        return {

            totalRules: ruleSet.rules.length,

            executedRules: executed,

            skippedRules: skipped,

            transformedFiles,

            executed: executedRules

        };

    }

}