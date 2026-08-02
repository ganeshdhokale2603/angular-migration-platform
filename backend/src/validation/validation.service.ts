import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

import { ValidationResult } from './models/validation-result.model';
import { ValidationCheck } from './models/validation-check.model';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ValidationReportService } from './report.service';

const execAsync = promisify(exec);

@Injectable()
export class ValidationService {

    private latestValidation: ValidationResult | null = null;

    constructor(

    private readonly reportService: ValidationReportService

) {}

    async run(
        projectPath: string
    ): Promise<ValidationResult> {

        const startedAt = new Date();

        const checks: ValidationCheck[] = [];

        await this.validateProjectFolder(projectPath, checks);

        await this.validatePackageJson(projectPath, checks);

        await this.validateAngularJson(projectPath, checks);

        await this.validateTsConfig(projectPath, checks);

        const completedAt = new Date();

        // return {

        //     success: checks.every(c => c.status !== 'FAILED'),

        //     project: projectPath,

        //     startedAt,

        //     completedAt,

        //     durationSeconds:
        //         Math.round(
        //             (completedAt.getTime() -
        //                 startedAt.getTime()) / 1000
        //         ),

        //     checks,

        //     passed:
        //         checks.filter(
        //             c => c.status === 'PASSED'
        //         ).length,

        //     failed:
        //         checks.filter(
        //             c => c.status === 'FAILED'
        //         ).length,

        //     warnings:
        //         checks.filter(
        //             c => c.status === 'WARNING'
        //         ).length

        // };

        const result: ValidationResult = {

    success: checks.every(
        c => c.status !== 'FAILED'
    ),

    project: projectPath,

    startedAt,

    completedAt,

    durationSeconds:
        Math.round(
            (
                completedAt.getTime() -
                startedAt.getTime()
            ) / 1000
        ),

    checks,

    passed:
        checks.filter(
            c => c.status === 'PASSED'
        ).length,

    failed:
        checks.filter(
            c => c.status === 'FAILED'
        ).length,

    warnings:
        checks.filter(
            c => c.status === 'WARNING'
        ).length

};

const reportPath =

    await this.reportService.generate(

        result

    );

result.reportPath = reportPath;

this.latestValidation = result;

return result;

    }

    private async validateProjectFolder(
        projectPath: string,
        checks: ValidationCheck[]
    ) {

        const exists = await fs.pathExists(projectPath);

        checks.push({

            name: 'Project Folder',

            status: exists ? 'PASSED' : 'FAILED',

            message: exists
                ? 'Project folder found.'
                : 'Project folder not found.',

            duration: 0

        });

    }

    private async validatePackageJson(
        projectPath: string,
        checks: ValidationCheck[]
    ) {

        const file = path.join(
            projectPath,
            'package.json'
        );

        const exists = await fs.pathExists(file);

        checks.push({

            name: 'package.json',

            status: exists ? 'PASSED' : 'FAILED',

            message: exists
                ? 'package.json exists.'
                : 'package.json missing.',

            duration: 0

        });

    }

    private async validateAngularJson(
    projectPath: string,
    checks: ValidationCheck[]
) {

    const file = path.join(
        projectPath,
        'angular.json'
    );

    const exists = await fs.pathExists(file);

    checks.push({

        name: 'angular.json',

        status: exists ? 'PASSED' : 'FAILED',

        message: exists
            ? 'angular.json found.'
            : 'angular.json missing.',

        duration: 0

    });

}

    private async validateTsConfig(
        projectPath: string,
        checks: ValidationCheck[]
    ) {

        const file = path.join(
            projectPath,
            'tsconfig.json'
        );

        const exists = await fs.pathExists(file);

        checks.push({

            name: 'tsconfig.json',

            status: exists ? 'PASSED' : 'FAILED',

            message: exists
                ? 'tsconfig.json found.'
                : 'tsconfig.json missing.',

            duration: 0

        });

    }

    private async validateAngularDependencies(
    projectPath: string,
    checks: ValidationCheck[]
) {

    const packageFile = path.join(
        projectPath,
        'package.json'
    );

    if (!(await fs.pathExists(packageFile))) {

        checks.push({

            name: 'Angular Dependencies',

            status: 'FAILED',

            message: 'package.json not found.',

            duration: 0

        });

        return;

    }

    const pkg = await fs.readJson(packageFile);

    const dependencies = {

        ...(pkg.dependencies || {}),

        ...(pkg.devDependencies || {})

    };

    const angularCore = dependencies['@angular/core'];

    checks.push({

        name: 'Angular Dependencies',

        status: angularCore ? 'PASSED' : 'FAILED',

        message: angularCore
            ? `Angular version detected: ${angularCore}`
            : '@angular/core dependency not found.',

        duration: 0

    });

}

    private async validateTypeScript(
    projectPath: string,
    checks: ValidationCheck[]
) {

    const packageFile = path.join(
        projectPath,
        'package.json'
    );

    if (!(await fs.pathExists(packageFile))) {

        return;

    }

    const pkg = await fs.readJson(packageFile);

    const dependencies = {

        ...(pkg.dependencies || {}),

        ...(pkg.devDependencies || {})

    };

    const ts = dependencies['typescript'];

    checks.push({

        name: 'TypeScript',

        status: ts ? 'PASSED' : 'FAILED',

        message: ts
            ? `TypeScript ${ts}`
            : 'TypeScript dependency missing.',

        duration: 0

    });

}

    private async validateNodeModules(
    projectPath: string,
    checks: ValidationCheck[]
) {

    const nodeModules = path.join(
        projectPath,
        'node_modules'
    );

    const exists = await fs.pathExists(nodeModules);

    checks.push({

        name: 'node_modules',

        status: exists ? 'PASSED' : 'WARNING',

        message: exists
            ? 'Dependencies installed.'
            : 'Run npm install.',

        duration: 0

    });

}

private async validateAngularCli(
    projectPath: string,
    checks: ValidationCheck[]
) {

    try {

        await execAsync(

            'npx ng version',

            {

                cwd: projectPath

            }

        );

        checks.push({

            name: 'Angular CLI',

            status: 'PASSED',

            message: 'Angular CLI detected.',

            duration: 0

        });

    }

    catch {

        checks.push({

            name: 'Angular CLI',

            status: 'FAILED',

            message: 'Angular CLI unavailable.',

            duration: 0

        });

    }

}

private async validateBuildConfiguration(
    projectPath: string,
    checks: ValidationCheck[]
) {

    try {

        await execAsync(

            'npm run build',

            {

                cwd: projectPath

            }

        );

        checks.push({

            name: 'Angular Build',

            status: 'PASSED',

            message: 'Project builds successfully.',

            duration: 0

        });

    }

    catch {

        checks.push({

            name: 'Angular Build',

            status: 'FAILED',

            message: 'Build failed.',

            duration: 0

        });

    }

}

private async validateLintConfiguration(
    projectPath: string,
    checks: ValidationCheck[]
) {

    const eslint = path.join(

        projectPath,

        '.eslintrc.json'

    );

    const eslintJs = path.join(

        projectPath,

        'eslint.config.js'

    );

    const exists =

        await fs.pathExists(eslint) ||

        await fs.pathExists(eslintJs);

    checks.push({

        name: 'Lint Configuration',

        status: exists ? 'PASSED' : 'WARNING',

        message: exists

            ? 'Lint configuration found.'

            : 'Lint configuration missing.',

        duration: 0

    });

}

getLatest() {

    return this.latestValidation;

}

}