import { Injectable } from '@nestjs/common';

import { PipelineResult } from './models/pipeline-result.model';
import { PipelineProgress } from './models/pipeline-progress.model';

import { EnvironmentService } from '../migration-engine/environment/environment.service';
import { ProjectAnalyzerService } from '../migration-engine/analyzer/project-analyzer.service';
import { MigrationAnalyzerService } from '../ai/analyzer/migration-analyzer.service';
import { RuleRecommendationService } from '../rules/recommendation/rule-recommendation.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { BackupService } from '../backup/backup.service';
import { RollbackService } from '../rollback/rollback.service';

@Injectable()
export class PipelineService {

    constructor(

        private readonly environment: EnvironmentService,

        private readonly analyzer: ProjectAnalyzerService,

        private readonly ai: MigrationAnalyzerService,

        private readonly rules: RuleRecommendationService,

        private readonly workspace: WorkspaceService,

        private readonly backup: BackupService,

        private readonly rollback: RollbackService

    ) { }

    private progress: PipelineProgress = {

        currentStep: 'Idle',

        completedSteps: 0,

        totalSteps: 10,

        percentage: 0,

        status: 'RUNNING'

    };

    getProgress(): PipelineProgress {

        return this.progress;

    }

    private updateProgress(

        step: string,

        completed: number

    ): void {

        this.progress.currentStep = step;

        this.progress.completedSteps = completed;

        this.progress.percentage = Math.round(

            (completed / this.progress.totalSteps) * 100

        );

    }

    async start(

        projectPath: string,

        targetVersion: number

    ): Promise<PipelineResult> {

        let backup: any;

        let checkpoint: any;

        try {

            this.progress.status = 'RUNNING';

            this.updateProgress(

                'Environment Validation',

                1

            );

            const environment =

                await this.environment.inspect();

            this.updateProgress(

                'Project Analysis',

                2

            );

            const analysis =

                await this.analyzer.analyze(

                    projectPath

                );

            this.updateProgress(

                'AI Analysis',

                3

            );

            const aiAnalysis =

                await this.ai.analyze(

                    projectPath

                );

            this.updateProgress(

                'Rule Recommendation',

                4

            );

            const recommendations =

                await this.rules.recommend(

                    projectPath

                );

            this.updateProgress(

                'Workspace Creation',

                5

            );

            const workspace =

                await this.workspace.create(

                    projectPath

                );

            this.updateProgress(

                'Backup Creation',

                6

            );

            backup =

                await this.backup.create(

                    projectPath

                );

            this.updateProgress(

                'Checkpoint Creation',

                7

            );

            checkpoint =

                await this.rollback.createCheckpoint(

                    projectPath,

                    'Pipeline Start'

                );

            this.progress.currentStep = 'Completed';

            this.progress.completedSteps = 10;

            this.progress.percentage = 100;

            this.progress.status = 'COMPLETED';

            return {

                success: true,

                project: analysis.projectName ?? projectPath,

                targetVersion,

                completedSteps: 10,

                totalSteps: 10,

                message: 'Pipeline completed successfully.',

                progress: this.progress,

                environment,

                analysis,

                aiAnalysis,

                recommendations,

                workspace,

                backup,

                checkpoint

            };

        }

        catch (error) {

            this.progress.status = 'FAILED';

            this.progress.currentStep = 'Automatic Rollback';

            try {

                if (backup) {

                    await this.backup.restore(

                        backup

                    );

                }

            }

            catch (restoreError) {

                console.error(

                    'Backup restore failed',

                    restoreError

                );

            }

            try {

                if (checkpoint) {

                    await this.rollback.rollback(

                        checkpoint.id

                    );

                }

            }

            catch (rollbackError) {

                console.error(

                    'Rollback failed',

                    rollbackError

                );

            }

            return {

                success: false,

                project: projectPath,

                targetVersion,

                completedSteps: this.progress.completedSteps,

                totalSteps: this.progress.totalSteps,

                message:

                    error instanceof Error

                        ? error.message

                        : 'Pipeline execution failed.',

                progress: this.progress

            };

        }

    }

}