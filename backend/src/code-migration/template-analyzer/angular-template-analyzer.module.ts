import { Module } from '@nestjs/common';

import {
    AngularTemplateAnalyzerService
} from './angular-template-analyzer.service';

@Module({
    providers: [
        AngularTemplateAnalyzerService
    ],

    exports: [
        AngularTemplateAnalyzerService
    ]
})
export class AngularTemplateAnalyzerModule {}