import {
  IsUrl,
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class MigrationRequestDto {

  @IsUrl()
  repositoryUrl: string;

  @IsNumber()
  fromVersion: number;

  @IsNumber()
  toVersion: number;

  @IsNotEmpty()
  outputFolder: string;

}