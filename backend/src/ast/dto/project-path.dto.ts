import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectPathDto {

    @ApiProperty({
        example: 'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'
    })
    @IsString()
    @IsNotEmpty()
    projectPath: string;

}