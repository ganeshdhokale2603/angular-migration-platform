import { Injectable } from '@nestjs/common';

import { RuleExecution } from './models/rule-execution.model';
import { MigrationResult } from './models/migration-result.model';
import { ReportService } from './report.service';

import { EnvironmentService } from '../migration-engine/environment/environment.service';
import { ProjectAnalyzerService } from '../migration-engine/analyzer/project-analyzer.service';
import { MigrationAnalyzerService } from '../ai/analyzer/migration-analyzer.service';
import { RuleRecommendationService } from '../rules/recommendation/rule-recommendation.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { BackupService } from '../backup/backup.service';
import { RollbackService } from '../rollback/rollback.service';
import { LoggerService } from './logger.service';

@Injectable()
export class ExecutorService {

    private lastResult?: MigrationResult;
    constructor(

        private readonly reportService: ReportService,

       private readonly logger: LoggerService

    ) {}

     
    async execute(

        projectPath: string,

        sourceVersion: number,

        targetVersion: number,

        rules: string[]

    ): Promise<MigrationResult> {

       await this.logger.log(

    `Migration started for ${projectPath}`

);




        const startedAt = new Date();

        const executedRules: RuleExecution[] = [];


        for (const rule of rules) {
            await this.logger.log(

    `Executing Rule : ${rule}`

);

            const start = Date.now();

            try {

                await this.executeRule(

                    projectPath,

                    rule

                );

                executedRules.push({

                    ruleId: rule,

                    ruleName: rule,

                    status: 'SUCCESS',

                    duration: Date.now() - start

                });

                await this.logger.log(

    `SUCCESS : ${rule}`

);

            }

            catch (error) {

                await this.logger.log(

    `FAILED : ${rule}`

);

                executedRules.push({

                    ruleId: rule,

                    ruleName: rule,

                    status: 'FAILED',

                    duration: Date.now() - start,

                    message:

                        error instanceof Error

                            ? error.message

                            : 'Execution failed.'

                });

            }

        }

       
       

        const completedAt = new Date();

        const result: MigrationResult = {

            success:

                executedRules.every(

                    r => r.status === 'SUCCESS'

                ),

            project: projectPath,

            sourceVersion,

            targetVersion,

            startedAt,

            completedAt,

            durationSeconds:

                Math.round(

                    (

                        completedAt.getTime() -

                        startedAt.getTime()

                    ) / 1000

                ),

            executedRules,

            totalRules: executedRules.length,

            successfulRules:

                executedRules.filter(

                    r => r.status === 'SUCCESS'

                ).length,

            failedRules:

                executedRules.filter(

                    r => r.status === 'FAILED'

                ).length,

            skippedRules:

                executedRules.filter(

                    r => r.status === 'SKIPPED'

                ).length

        };

        // Generate reports
        const report = await this.reportService.generate(

            result

        );

        

result.logPath =

    this.logger.getLogFile();

        result.reportPath = report.json;

          await this.logger.log(

    'Migration completed.'

);
this.lastResult = result;

        return result;

    }

    private async executeRule(

        projectPath: string,

        rule: string

    ): Promise<void> {

        console.log(

            `Executing ${rule} on ${projectPath}`

        );

        await new Promise(

            resolve => setTimeout(

                resolve,

                300

            )

        );

    }

    getSummary(): MigrationResult | null {

    return this.lastResult ?? null;

}

}