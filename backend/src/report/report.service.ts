import { Injectable } from '@nestjs/common';
import { MigrationReport } from './migration-report.interface';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class ReportService {

    async generate(
        projectPath: string,
        report: MigrationReport
    ) {

        const reportPath = path.join(
            projectPath,
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