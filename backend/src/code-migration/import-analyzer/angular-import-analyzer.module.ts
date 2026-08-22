import { Module } from '@nestjs/common';

import {
    AngularImportAnalyzerService
} from './angular-import-analyzer.service';

@Module({

    providers: [
        AngularImportAnalyzerService
    ],

    exports: [
        AngularImportAnalyzerService
    ]

})
export class AngularImportAnalyzerModule {}