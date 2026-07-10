import { Module } from '@nestjs/common';

import { AIAdvisorService } from './ai-advisor.service';
import { RiskAnalyzer } from './risk-analyzer';
import { RecommendationEngine } from './recommendation-engine';
import { PromptBuilder } from './prompt.builder';
import { LLMService } from './llm.service';

@Module({
    providers: [
        AIAdvisorService,
        RiskAnalyzer,
        RecommendationEngine,
        PromptBuilder,
        LLMService
    ],
    exports: [
        AIAdvisorService
    ]

})

export class AIAdvisorModule { }