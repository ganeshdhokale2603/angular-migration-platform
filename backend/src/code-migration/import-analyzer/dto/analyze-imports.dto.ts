import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class AnalyzeImportsDto {

    @ApiProperty({
        description: 'TypeScript/Angular source code to analyze',
        example:
            "import { Component } from '@angular/core';"
    })
    @IsString()
    @IsNotEmpty()
    source: string;

}