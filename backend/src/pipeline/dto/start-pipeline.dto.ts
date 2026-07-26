import {
    ApiProperty
} from '@nestjs/swagger';

import {
    IsInt,
    IsString,
    Min
} from 'class-validator';

export class StartPipelineDto {

    @ApiProperty({

        example:
        'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'

    })
    @IsString()
    projectPath: string;

    @ApiProperty({

        example: 20

    })
    @IsInt()
    @Min(8)
    targetVersion: number;

}