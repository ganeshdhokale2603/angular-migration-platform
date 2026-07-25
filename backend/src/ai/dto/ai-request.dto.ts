import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AiRequestDto {

    @ApiProperty({
        example: 'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'
    })
    @IsString()
    @IsNotEmpty()
    projectPath: string;

}