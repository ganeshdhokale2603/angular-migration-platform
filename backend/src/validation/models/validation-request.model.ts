import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsString
} from 'class-validator';

export class ValidationRequest {

    @ApiProperty({
        example: 'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app',
        description: 'Path of the Angular project to validate'
    })
    @IsString()
    projectPath: string;

}