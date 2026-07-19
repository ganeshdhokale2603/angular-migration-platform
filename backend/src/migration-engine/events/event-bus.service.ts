import { Injectable } from '@nestjs/common';

import { MigrationEngineEvent } from './migration-event.interface';

@Injectable()
export class EventBusService {

    private readonly events: MigrationEngineEvent[] = [];

    publish(
        event: MigrationEngineEvent
    ) {

        this.events.push(event);

        console.log(

            `[EVENT] ${event.type} : ${event.message}`

        );

    }

    getEvents() {

        return this.events;

    }

    clear() {

        this.events.length = 0;

    }

}