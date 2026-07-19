import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { MigrationEngineService } from './migration-engine.service';
import { EventBusService } from './events/event-bus.service';

@Controller('migration-engine')
export class MigrationEngineController {

    constructor(
        private readonly service: MigrationEngineService,
        private readonly eventBus: EventBusService
    ) {}

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

}