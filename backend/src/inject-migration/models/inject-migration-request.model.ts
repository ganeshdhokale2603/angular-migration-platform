import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsString
} from 'class-validator';

export class InjectMigrationRequest {

    @ApiProperty({
            example:
            'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'
        })
        @IsString()
        projectPath: string;

}