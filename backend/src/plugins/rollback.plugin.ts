import { Injectable } from '@nestjs/common';

import { MigrationPlugin } from './plugin.interface';

@Injectable()
export class RollbackPlugin implements MigrationPlugin {

    name = 'Rollback';

    version = '1.0';

    async execute(): Promise<void> {

        console.log(

            'Rollback Plugin Executed.'

        );

    }

}