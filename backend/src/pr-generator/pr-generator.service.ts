import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class PrGeneratorService {

  async generate(projectPath: string, report: any) {

    const markdown = `
        # Day 15 Migration

        ## Summary

        Project:
        ${report.projectName}

        Files Scanned:
        ${report.filesScanned}

        Files Migrated:
        ${report.filesMigrated}

        Components:
        ${report.components}

        Modules:
        ${report.modules}

        Services:
        ${report.services}

        Confidence Score:
        ${report.confidenceScore}%

        ---

        ## Validation

        ${JSON.stringify(report.validation, null, 2)}

        ---

        ## Template Validation

        ${report.templateValidation
        ?.map(v =>
        `- ${v.file}
        Valid : ${v.valid}
        Warnings : ${v.warnings.join(", ") || "None"}`
        )
        .join("\n")}

        ---

        ## Reviewer Checklist

        - [ ] Application builds

        - [ ] Routing works

        - [ ] Standalone components verified

        - [ ] Bootstrap updated

        - [ ] Template validation reviewed

        - [ ] Manual review items checked

        `;

    const file = path.join(projectPath, "PULL_REQUEST.md");

    await fs.writeFile(file, markdown);

    return file;

  }

}