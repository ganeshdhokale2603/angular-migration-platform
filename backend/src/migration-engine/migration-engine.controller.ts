import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { MigrationEngineService } from './migration-engine.service';
import { EventBusService } from './events/event-bus.service';
import { CommandExecutor } from './executors/command.executor';
import { EnvironmentService } from './environment/environment.service';
import { ProjectAnalyzerService } from './analyzer/project-analyzer.service';
import { MigrationPlannerService } from './planner/migration-planner.service';
import { PackageUpdaterService } from './package-updater/package-updater.service';
import { NpmInstallerService } from './installers/npm-installer.service';
import { AngularUpdateExecutor } from './executors/angular-update.executor';
import { ExecutePlanDto } from './dto/execute-plan.dto';


@Controller('migration-engine')
export class MigrationEngineController {

    constructor(
        private readonly service: MigrationEngineService,
        private readonly eventBus: EventBusService,
        private readonly commandExecutor: CommandExecutor,
        private readonly environmentService: EnvironmentService,
        private readonly analyzer: ProjectAnalyzerService,
        private readonly planner: MigrationPlannerService,
        private readonly packageUpdater: PackageUpdaterService,
        private readonly npmInstaller: NpmInstallerService,
        private readonly angularUpdateExecutor: AngularUpdateExecutor,
    ) { }

    @Post('start')
    async start(
        @Body() body: {
            projectPath: string;
            targetVersion: number;
        }
    ) {

        return this.service.startMigration(
            body.projectPath,
            body.targetVersion
        );

    }

    @Get('status')
    getStatus() {

        return this.service.getStatus();

    }

    @Get('events')
    getEvents() {

        return this.eventBus.getEvents();

    }

    @Get('test-command')
    async testCommand() {

        return await this.commandExecutor.execute(

            'ng version'

        );

    }

    @Get('environment')
    async environment() {

        return await this.environmentService.inspect();

    }

    @Post('analyze')
    async analyze(

        @Body('projectPath')
        projectPath: string

    ) {

        return await this.analyzer.analyze(
            projectPath
        );

    }

    @Post('plan')
    async plan(

        @Body('projectPath')
        projectPath: string

    ) {

        const analysis =

            await this.analyzer.analyze(

                projectPath

            );

        return this.planner.createPlan(

            analysis.projectName,

            analysis.angularVersion,

            analysis.migrationTarget

        );

    }

    @Post('update-package')

    async updatePackage(

        @Body('projectPath')

        projectPath: string,

        @Body('targetVersion')

        targetVersion: number

    ) {

        return await this.packageUpdater.update(

            projectPath,

            targetVersion

        );

    }

    @Post('install')

    async install(

        @Body('projectPath')

        projectPath: string

    ) {

        return await this.npmInstaller.install(

            projectPath

        );

    }

   @Post('execute-plan')
async executePlan(

    @Body()
    request: ExecutePlanDto

) {

    return await this.angularUpdateExecutor.execute(

        request.projectPath,

        request.plan

    );

}

}