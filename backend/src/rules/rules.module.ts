import { Module } from '@nestjs/common';
import { AstModule } from '../ast/ast.module';
import { RulesService } from './rules.service';
import { RuleLoaderService } from './loader/rule-loader.service';
import { RulesController } from './rules.controller';
import { RuleValidatorService } from './validator/rule-validator.service';
import { RuleRegistryService } from './registry/rule-registry.service';
import { RuleExecutorService } from './executor/rule-executor.service';
import { RuleRecommendationService } from './recommendation/rule-recommendation.service';
import { MigrationEngineModule } from '../migration-engine/migration-engine.module';
import { RulePipelineService } from './pipeline/rule-pipeline.service';

@Module({
imports: [
    AstModule,
    MigrationEngineModule
  ],
    controllers: [

        RulesController

    ],

    providers: [

        RulesService,

        RuleLoaderService,
        RuleValidatorService,
        RuleRegistryService,
        RuleExecutorService,
        RuleRecommendationService,
        RulePipelineService

    ],

    exports: [

        RulesService,

        RuleLoaderService,
        RuleValidatorService,
        RuleRegistryService,
        RuleExecutorService,
        RuleRecommendationService,
        RulePipelineService

    ]

})
export class RulesModule {}