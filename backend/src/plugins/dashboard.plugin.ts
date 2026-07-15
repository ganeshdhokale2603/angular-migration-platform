import { Injectable } from '@nestjs/common';

import { MigrationPlugin } from './plugin.interface';

@Injectable()
export class DashboardPlugin implements MigrationPlugin {

    name = 'Dashboard';

    version = '1.0';

    async execute(): Promise<void> {

        console.log(

            'Dashboard Plugin Executed.'

        );

    }

}