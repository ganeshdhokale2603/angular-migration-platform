import { Injectable } from '@nestjs/common';

import { ProjectAnalyzerService } from '../../migration-engine/analyzer/project-analyzer.service';
import { RuleRecommendationService } from '../recommendation/rule-recommendation.service';
import { RuleExecutorService } from '../executor/rule-executor.service';

import { RulePipelineResult } from '../models/rule-pipeline-result.model';

@Injectable()
export class RulePipelineService {

    constructor(

        private readonly analyzer: ProjectAnalyzerService,

        private readonly recommendation: RuleRecommendationService,

        private readonly executor: RuleExecutorService

    ) {}

    async execute(

        projectPath: string

    ): Promise<RulePipelineResult> {

        const started = Date.now();

        const analysis =

            await this.analyzer.analyze(projectPath);

        const recommendations =

            await this.recommendation.recommend(projectPath);

        const execution =

            await this.executor.execute(

                projectPath,

                analysis.migrationTarget

            );

        return {

            success: true,

            project: analysis.projectName ?? '',

            angularVersion: analysis.angularVersion,

            recommendedRules: recommendations,

            execution,

            duration: Date.now() - started

        };

    }

}