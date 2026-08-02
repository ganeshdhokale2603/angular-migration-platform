import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsString
} from 'class-validator';

export class PlannerRequest {

    @ApiProperty({
        example: 'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'
    })
    @IsString()
    projectPath: string;

    @ApiProperty({
        example: 8
    })
    @IsNumber()
    sourceVersion: number;

    @ApiProperty({
        example: 20
    })
    @IsNumber()
    targetVersion: number;

}