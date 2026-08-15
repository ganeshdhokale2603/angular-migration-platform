import { Module } from '@nestjs/common';

import {
    ConstructorTransformerService
} from './constructor-transformer.service';

@Module({

    providers: [
        ConstructorTransformerService
    ],

    exports: [
        ConstructorTransformerService
    ]

})
export class ConstructorTransformerModule {}