import {
    Module
} from '@nestjs/common';

import {
    InjectMigrationController
} from './inject-migration.controller';

import {
    InjectMigrationService
} from './inject-migration.service';

@Module({

    controllers: [
        InjectMigrationController
    ],

    providers: [
        InjectMigrationService
    ],

    exports: [
        InjectMigrationService
    ]

})
export class InjectMigrationModule {}