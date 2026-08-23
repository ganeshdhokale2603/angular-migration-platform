import { Module } from '@nestjs/common';

import {
    AngularImportAnalyzerService
} from './angular-import-analyzer.service';

import {
    ImportMigrationRuleService
} from './import-migration-rule.service';

@Module({

    providers: [
        AngularImportAnalyzerService,
        ImportMigrationRuleService
    ],

    exports: [
        AngularImportAnalyzerService,
        ImportMigrationRuleService
    ]

})
export class AngularImportAnalyzerModule {}