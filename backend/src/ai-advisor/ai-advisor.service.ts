import { Injectable } from '@nestjs/common';

import { MigrationReport } from '../report/models/migration-report';

import { AIReport } from './ai.report';
import { RiskAnalyzer } from './risk-analyzer';
import { RecommendationEngine } from './recommendation-engine';
import { PromptBuilder } from './prompt.builder';
import { LLMService } from './llm.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIAdvisorService {

    constructor(

        private readonly riskAnalyzer: RiskAnalyzer,

        private readonly recommendationEngine: RecommendationEngine,

        private readonly promptBuilder: PromptBuilder,

        private readonly llmService: LLMService,
        private readonly configService: ConfigService

    ) { }

    async analyze(

        report: MigrationReport

    ): Promise<AIReport> {
        const risk =
            this.riskAnalyzer.analyze(report);

        const recommendations =
            this.recommendationEngine.generate(
                report
            );

        const prompt =
            this.promptBuilder.build(report);

        const llm =
            await this.llmService.analyze(prompt);

        const aiEnabled =
            this.configService.get<boolean>('enableAI') ?? true;

        if (!aiEnabled) {

            return {

                projectRisk: 'LOW',

                confidenceScore: 0,

                riskScore: 0,

                riskFactors: [],

                recommendations: [],

                llmSummary: 'AI is disabled.',

                migrationStrategy: 'Manual',

                llmRecommendations: []

            };

        }

        return {

            projectRisk: risk.overallRisk,

            confidenceScore: risk.confidenceScore,

            riskScore: risk.riskScore,

            riskFactors: risk.riskFactors,

            recommendations,

            llmSummary: '',

            migrationStrategy: '',

            llmRecommendations: []

        };
    }

}