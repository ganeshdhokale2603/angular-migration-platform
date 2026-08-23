import { Module } from '@nestjs/common';

import {
    AngularImportAnalyzerService
} from './angular-import-analyzer.service';

import {
    ImportMigrationRuleService
} from './import-migration-rule.service';

import {
  ImportTransformerService
} from './import-transformer.service';

@Module({

    providers: [
        AngularImportAnalyzerService,
        ImportMigrationRuleService,
        ImportTransformerService
    ],

    exports: [
        AngularImportAnalyzerService,
        ImportMigrationRuleService,
        ImportTransformerService
    ]

})
export class AngularImportAnalyzerModule {}