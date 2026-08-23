import {
    ApiProperty
} from '@nestjs/swagger';

import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class AnalyzeImportRuleDto {

    @ApiProperty({
        example: '@angular/core',
        description: 'Module containing the import.'
    })
    @IsString()
    @IsNotEmpty()
    module: string;

    @ApiProperty({
        example: 'Component',
        description: 'Imported symbol to evaluate.'
    })
    @IsString()
    @IsNotEmpty()
    importName: string;

}