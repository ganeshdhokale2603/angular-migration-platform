import { ApiProperty } from '@nestjs/swagger';

import {

    IsString,

    IsNotEmpty

} from 'class-validator';

export class RollbackRequest {

    @ApiProperty({

        example: 'CHK-1001'

    })

    @IsString()

    @IsNotEmpty()

    checkpointId: string;

}