import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsString
} from 'class-validator';

export class AstRequest {

    @ApiProperty({
        example:
            'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app\\src\\app\\app.component.ts'
    })
    @IsString()
    filePath: string;

}