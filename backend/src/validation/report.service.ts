import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

import { ValidationResult } from './models/validation-result.model';

@Injectable()
export class ValidationReportService {

    private readonly reportFolder = path.join(

        process.cwd(),

        'validation-reports'

    );

    async generate(

        result: ValidationResult

    ): Promise<string> {

        await fs.ensureDir(

            this.reportFolder

        );

        const file = path.join(

            this.reportFolder,

            `validation-${Date.now()}.json`

        );

        await fs.writeJson(

            file,

            result,

            {

                spaces: 2

            }

        );

        return file;

    }

}