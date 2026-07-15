import { Injectable } from '@nestjs/common';
import { MigrationReport } from './migration-report.interface';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReportService {
    constructor(

        private readonly configService: ConfigService

    ) { }

    async generate(

        projectPath: string,

        report: MigrationReport

    ) {

        const outputFolder =

            this.configService.get<string>(

                'reportOutput'

            ) ?? 'reports';

        const reportDirectory = path.join(

            projectPath,

            outputFolder

        );

        await fs.ensureDir(

            reportDirectory

        );

        const reportPath = path.join(

            reportDirectory,

            'migration-report.json'

        );

        await fs.writeJson(

            reportPath,

            report,

            {

                spaces: 2

            }

        );

        return reportPath;

    }

}