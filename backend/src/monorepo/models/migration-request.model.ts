import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    ArrayNotEmpty,
    IsString
} from 'class-validator';

export class MigrationRequest {

    @ApiProperty({
        example: [
            'apps/admin',
            'apps/customer',
            'libs/shared-ui'
        ]
    })

    @IsArray()

    @ArrayNotEmpty()

    @IsString({
        each: true
    })

    projects: string[];

}