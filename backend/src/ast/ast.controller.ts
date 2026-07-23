import {Controller, Get, Query, Body, Post } from '@nestjs/common';

import { AstService } from './ast.service';
import { ProjectPathDto } from './dto/project-path.dto';
import { ApiBody } from '@nestjs/swagger';

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
@ApiBody({ type: ProjectPathDto })
transformStandalone(

     @Body() body: ProjectPathDto

) {

    return this.astService.transformStandalone(

        body.projectPath

    );

}

@Post('bootstrap')
@ApiBody({ type: ProjectPathDto })
transformBootstrap(

     @Body() body: ProjectPathDto

) {

    return this.astService.transformBootstrap(

        body.projectPath

    );

}

@Post('templates')
@ApiBody({ type: ProjectPathDto })
async transformTemplates(

     @Body() body: ProjectPathDto

) {

    return this.astService.transformTemplates(

        body.projectPath

    );

}

@Post('inject')
@ApiBody({ type: ProjectPathDto })
transformInject(

     @Body() body: ProjectPathDto

) {

    return this.astService.transformInject(

        body.projectPath

    );

}

@Post('rxjs')
@ApiBody({ type: ProjectPathDto })
transformRxjs(

     @Body() body: ProjectPathDto

) {

    return this.astService.transformRxjs(

        body.projectPath

    );

}


}