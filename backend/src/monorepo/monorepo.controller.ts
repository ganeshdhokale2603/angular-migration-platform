import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { MonorepoService } from './monorepo.service';
import { MigrationRequest } from './models/migration-request.model';

@Controller('monorepo')
export class MonorepoController {

    constructor(

        private readonly monorepoService: MonorepoService

    ) { }

    @Get('status')
    getStatus() {

        return {

            status: this.monorepoService.getStatus()

        };

    }
    @Get('detect')
    detect(

        @Query('path') path: string

    ) {

        return this.monorepoService.detectWorkspace(path);

    }

    @Get('repositories')
    scanRepositories( @Query('path') path: string ) {
        return this.monorepoService.scanRepositories(path);
    }

    @Get('dependencies')
    getDependencies( @Query('path') path: string) {
        return this.monorepoService.buildDependencyGraph(path);
    }

    @Post('migration-plan')
createPlan(

    @Body()

    request: MigrationRequest

) {

    return this.monorepoService.createMigrationPlan(

        request.projects

    );

}

}