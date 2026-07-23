import { Controller, Get, Query, Post, Body } from '@nestjs/common';

import { RulesService } from './rules.service';
import { RuleRegistryService } from './registry/rule-registry.service';
import { RuleExecutorService } from './executor/rule-executor.service';
import { RuleRecommendationService } from './recommendation/rule-recommendation.service';
import { RulePipelineService } from './pipeline/rule-pipeline.service';

@Controller('rules')
export class RulesController {

    constructor(

        private readonly rulesService: RulesService,
        private readonly registry: RuleRegistryService,
        private readonly executor: RuleExecutorService,
        private readonly recommendation: RuleRecommendationService,
private readonly pipeline: RulePipelineService
    ) {}

    @Get('load')
    async load(

        @Query('version')

        version: number

    ) {

        return await this.rulesService.loadRules(

            Number(version)

        );

    }

    @Get('validate')
async validate(

    @Query('version')

    version: number

) {

    const rules =

        await this.rulesService.loadRules(

            Number(version)

        );

    return {

        valid: true,

        totalRules: rules.rules.length

    };

}

@Get('registry')
async registryRules(

    @Query('version')

    version: number

) {

    return await this.registry.get(

        Number(version)

    );

}

@Post('reload')
async reload(

    @Body('version')

    version: number

) {

    return await this.registry.reload(

        Number(version)

    );

}

@Get('registry/status')
status() {

    return {

        cachedVersions: this.registry.versions(),

        cacheSize: this.registry.size()

    };

}

@Post('registry/clear')
clear() {

    this.registry.clear();

    return {

        success: true

    };

}

@Post('execute')
async execute(

    @Body()

    body: {

        projectPath: string;

        version: number;

    }

) {

    return await this.executor.execute(

        body.projectPath,

        body.version

    );

}

@Post('recommend')
async recommend(

    @Body('projectPath')

    projectPath: string

) {

    return this.recommendation.recommend(

        projectPath

    );

}

@Post('pipeline')
async pipeline(

    @Body('projectPath')

    projectPath: string

) {

    return this.pipeline.execute(

        projectPath

    );

}


}