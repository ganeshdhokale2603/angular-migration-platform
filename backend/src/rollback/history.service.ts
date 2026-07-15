import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { MigrationHistory } from './models/migration-history.model';

@Injectable()
export class HistoryService {

    private readonly history: MigrationHistory[] = [];

    add(

        project: string,

        status: 'SUCCESS' | 'FAILED' | 'ROLLED_BACK',

        checkpointId: string

    ): MigrationHistory {

        const record: MigrationHistory = {

            id: randomUUID(),

            project,

            migratedAt: new Date(),

            status,

            checkpointId

        };

        this.history.push(record);

        return record;

    }

    getAll(): MigrationHistory[] {

        return this.history;

    }

}