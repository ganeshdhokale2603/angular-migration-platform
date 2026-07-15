import { Injectable } from '@nestjs/common';

import { MigrationPlugin } from './plugin.interface';

@Injectable()
export class AIPlugin implements MigrationPlugin {

    name = 'AI Advisor';

    version = '1.0';

    async execute(): Promise<void> {

        console.log(

            'AI Advisor Plugin Executed.'

        );

    }

}