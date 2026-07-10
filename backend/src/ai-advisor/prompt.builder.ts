import { Injectable } from '@nestjs/common';
import { MigrationReport } from '../report/models/migration-report';

@Injectable()
export class PromptBuilder {

    build(report: MigrationReport): string {

        return `
Analyze the following Angular migration report.

Files Scanned: ${report.filesScanned}

Files Migrated: ${report.filesMigrated}

Components: ${report.components}

Modules: ${report.modules}

Services: ${report.services}

Generate:

1. Executive Summary

2. Migration Strategy

3. Top Recommendations

4. Potential Risks
`;

    }

}