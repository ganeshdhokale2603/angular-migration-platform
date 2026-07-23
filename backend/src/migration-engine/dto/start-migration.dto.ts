import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StartMigrationDto {

  @ApiProperty({
    example:
      'C:\\GD-Personal\\projects\\Zensar-Project\\angular-8-example-app'
  })
  @IsString()
  projectPath: string;

  @ApiProperty({
    example: 20
  })
  @IsNumber()
  targetVersion: number;
}