import { Module } from '@nestjs/common';

import { AiController } from './ai.controller';
import { AiService } from './ai.service';

import { MigrationAnalyzerService } from './analyzer/migration-analyzer.service';

import { MigrationEngineModule } from '../migration-engine/migration-engine.module';
import { RulesModule } from '../rules/rules.module';
import { RiskAnalyzerService } from './risk/risk-analyzer.service';
import { MigrationScoreService } from './scoring/migration-score.service';
import { EffortEstimatorService } from './estimator/effort-estimator.service';
import { RoadmapGeneratorService } from './roadmap/roadmap-generator.service';
import { FixSuggestionService } from './advisor/fix-suggestion.service';

@Module({

    imports: [

        MigrationEngineModule,
        RulesModule

    ],

    controllers: [

        AiController

    ],

    providers: [

        AiService,
        MigrationAnalyzerService,
        RiskAnalyzerService,
            MigrationScoreService,

    EffortEstimatorService,
    RoadmapGeneratorService,
    FixSuggestionService

    ],

    exports: [

        AiService

    ]

})

export class AiModule {}