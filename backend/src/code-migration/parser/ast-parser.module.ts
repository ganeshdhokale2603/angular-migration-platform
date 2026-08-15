import { Module } from '@nestjs/common';
import { AstParserController } from './ast-parser.controller';
import { AstParserService } from './ast-parser.service';

@Module({

    controllers: [AstParserController],

    providers: [

        AstParserService

    ],

    exports: [

        AstParserService

    ]

})

export class AstParserModule {}