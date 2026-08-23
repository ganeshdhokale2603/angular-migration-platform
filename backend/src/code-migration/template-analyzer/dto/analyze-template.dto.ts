import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class AnalyzeTemplateDto {

    @ApiProperty({
        description: 'Angular HTML template source',
        required: true,
        example:
            '<div *ngIf="isBusy">' +
            '<mat-spinner></mat-spinner>' +
            '</div>'
    })
    @IsString()
    @IsNotEmpty()
    source: string;

}