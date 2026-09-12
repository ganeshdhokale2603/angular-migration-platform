import { Module } from '@nestjs/common';

import {
    AngularTemplateRuleService
} from './angular-template-rule.service';

@Module({

    providers: [
        AngularTemplateRuleService
    ],

    exports: [
        AngularTemplateRuleService
    ]

})
export class AngularTemplateRuleModule {}