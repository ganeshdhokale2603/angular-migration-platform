import { Injectable } from '@nestjs/common';

import { ProjectAnalyzerService } from '../../migration-engine/analyzer/project-analyzer.service';
import { RuleRecommendationService } from '../../rules/recommendation/rule-recommendation.service';
import { RiskAnalyzerService } from '../risk/risk-analyzer.service';
import { MigrationScoreService } from '../scoring/migration-score.service';
import { EffortEstimatorService } from '../estimator/effort-estimator.service';
import { RoadmapGeneratorService } from '../roadmap/roadmap-generator.service';
import { FixSuggestionService } from '../advisor/fix-suggestion.service';

@Injectable()
export class MigrationAnalyzerService {

    constructor(

        private readonly analyzer: ProjectAnalyzerService,
        private readonly recommendation: RuleRecommendationService,
        private readonly risk: RiskAnalyzerService,
            private readonly score: MigrationScoreService,
    private readonly estimator: EffortEstimatorService,
    private readonly roadmap: RoadmapGeneratorService,
     private readonly advisor: FixSuggestionService

    ) {}

async analyze(

    projectPath: string

) {

    const project =

        await this.analyzer.analyze(

            projectPath

        );

    const recommendations =

        await this.recommendation.recommend(

            projectPath

        );

    const risk =

        this.risk.analyze(

            project

        );

    const score =

        this.score.calculate(

            project

        );

    const estimatedHours =

        this.estimator.estimate(

            project

        );

        const roadmap =

    this.roadmap.generate(

        project,

        estimatedHours

    );

    const fixes =

    this.advisor.generate(

        project

    );

return {

    project,

    score,

    risk,

    estimatedHours,

    roadmap,

    fixes,

    recommendations

};

}

}