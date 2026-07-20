import {Controller, Get, Query, Body, Post } from '@nestjs/common';

import { AstService } from './ast.service';

@Controller('ast')
export class AstController {

    constructor(

        private readonly astService: AstService,
        

    ) {}

    @Get('analyze')

    analyze(

        @Query('projectPath')

        projectPath: string

    ) {

        return this.astService.analyzeProject(

            projectPath

        );

    }

    @Post('standalone')

transformStandalone(

    @Body()

    body: {

        projectPath: string

    }

) {

    return this.astService.transformStandalone(

        body.projectPath

    );

}

@Post('bootstrap')

transformBootstrap(

    @Body()

    body: {

        projectPath: string

    }

) {

    return this.astService.transformBootstrap(

        body.projectPath

    );

}

@Post('templates')
async transformTemplates(

    @Body()

    body: {

        projectPath: string

    }

) {

    return this.astService.transformTemplates(

        body.projectPath

    );

}

@Post('inject')
transformInject(

    @Body()

    body: {

        projectPath: string;

    }

) {

    return this.astService.transformInject(

        body.projectPath

    );

}

@Post('rxjs')
transformRxjs(

    @Body()

    body: {

        projectPath: string;

    }

) {

    return this.astService.transformRxjs(

        body.projectPath

    );

}


}