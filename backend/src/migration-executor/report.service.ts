import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

import { MigrationResult } from './models/migration-result.model';

@Injectable()
export class ReportService {

    private readonly reportDirectory = path.join(
        process.cwd(),
        'migration-reports'
    );

    async generate(
        result: MigrationResult
    ): Promise<{
        json: string;
        markdown: string;
    }> {

        await fs.ensureDir(
            this.reportDirectory
        );

        const jsonPath = path.join(
            this.reportDirectory,
            'migration-report.json'
        );

        const markdownPath = path.join(
            this.reportDirectory,
            'migration-report.md'
        );

        await fs.writeJson(
            jsonPath,
            result,
            {
                spaces: 2
            }
        );

        const markdown = this.createMarkdown(
            result
        );

        await fs.writeFile(
            markdownPath,
            markdown
        );

        return {

            json: jsonPath,

            markdown: markdownPath

        };

    }

    private createMarkdown(
        result: MigrationResult
    ): string {

        return `# Angular Migration Report

## Project

${result.project}

## Migration

Angular ${result.sourceVersion} → Angular ${result.targetVersion}

## Summary

| Metric | Value |
|--------|------:|
| Total Rules | ${result.totalRules} |
| Successful | ${result.successfulRules} |
| Failed | ${result.failedRules} |
| Skipped | ${result.skippedRules} |
| Duration | ${result.durationSeconds} sec |

## Executed Rules

${result.executedRules.map(rule =>

`- ${rule.ruleName} : ${rule.status} (${rule.duration} ms)`

).join('\n')}
`;

    }

}