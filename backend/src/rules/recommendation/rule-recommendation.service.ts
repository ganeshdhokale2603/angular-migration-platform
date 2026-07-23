import { Injectable } from '@nestjs/common';

import { RuleRegistryService } from '../registry/rule-registry.service';
import { ProjectAnalyzerService } from '../../migration-engine/analyzer/project-analyzer.service';

import { RuleRecommendation } from '../models/rule-recommendation.model';

@Injectable()
export class RuleRecommendationService {

    constructor(

        private readonly registry: RuleRegistryService,

        private readonly analyzer: ProjectAnalyzerService

    ) {}

    async recommend(

        projectPath: string

    ): Promise<RuleRecommendation[]> {

        const analysis =

            await this.analyzer.analyze(projectPath);

        const rules =
            await this.registry.getRules(
                analysis.migrationTarget
            );

        return rules.map(rule => ({

            ruleId: rule.id,

            name: rule.name,

            recommended: true,

            priority:

                analysis.angularVersion < 16 ? 1 : 2,

            reason:

                `Recommended for Angular ${analysis.angularVersion} → ${analysis.migrationTarget}`

        }));

    }

}