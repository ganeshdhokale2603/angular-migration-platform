import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ExecutionContext } from './models/execution-context';
import { ExecutionResult } from './models/execution-result';
import { ExecutionState } from './models/execution-state';
import { PipelineStage } from './models/pipeline-stage';

import { ProjectDiscoveryService } from './services/project-discovery.service';
import { EventBusService } from './events/event-bus.service';

import { RollbackService } from '../rollback/rollback.service';
import { ValidatorService } from '../validator/validator.service';
import { ReportService } from '../report/report.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { PrGeneratorService } from '../pr-generator/pr-generator.service';

import { EnvironmentService } from './environment/environment.service';
import { ProjectAnalyzerService } from './analyzer/project-analyzer.service';
import { MigrationPlannerService } from './planner/migration-planner.service';
import { PackageUpdaterService } from './package-updater/package-updater.service';

import { NpmInstallerService } from './installers/npm-installer.service';
import { AngularUpdateExecutor } from './executors/angular-update.executor';
import { BuildService } from './builders/build.service';

@Injectable()
export class MigrationEngineService {

    private context!: ExecutionContext;

    constructor(

        private readonly discoveryService: ProjectDiscoveryService,

        private readonly eventBus: EventBusService,

        private readonly rollbackService: RollbackService,

        private readonly validatorService: ValidatorService,

        private readonly reportService: ReportService,

        private readonly dashboardService: DashboardService,

        private readonly prGeneratorService: PrGeneratorService,

        private readonly environmentService: EnvironmentService,

        private readonly analyzer: ProjectAnalyzerService,

        private readonly planner: MigrationPlannerService,

        private readonly packageUpdater: PackageUpdaterService,

        private readonly npmInstaller: NpmInstallerService,

        private readonly angularUpdateExecutor: AngularUpdateExecutor,

        private readonly buildService: BuildService

    ) { }

    async startMigration(

        projectPath: string,

        targetVersion: number

    ): Promise<ExecutionResult> {
        try {

            this.context = {

                executionId: randomUUID(),

                projectPath,

                targetVersion,

                project:

                    this.discoveryService.discover(

                        projectPath

                    ),

                options: {

                    targetVersion,

                    enableRollback: true,

                    enableAI: true,

                    autoInstall: true,

                    autoBuild: true,

                    autoCommit: false

                },

                state: ExecutionState.RUNNING,

                currentStage: PipelineStage.INITIALIZE,

                completedStages: [],

                progress: {

                    percentage: 0,

                    currentStage: PipelineStage.INITIALIZE,

                    currentStageName: 'Initialize',

                    completedStages: 0,

                    totalStages: 8,

                    status: 'Running'

                },

                logs: [],

                warnings: [],

                errors: [],

                metrics: {

                    startedAt: new Date(),

                    elapsedTime: 0,

                    estimatedRemaining: 0,

                    successfulStages: 0,

                    failedStages: 0

                }

            };

            this.eventBus.publish({

                type: 'MigrationStarted',

                timestamp: new Date(),

                executionId: this.context.executionId,

                message: 'Migration Started'

            });

            this.context.logs.push(

                'Enterprise migration started.'

            );

            this.rollbackService.createCheckpoint(

                projectPath,

                'Before Migration'

            );

            const environment =

                await this.environmentService.inspect();

            if (!environment.supported) {

                throw new Error(

                    environment.warnings.join('\n')

                );

            }

            this.context.logs.push(

                'Environment validation completed.'

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const analysis =

                await this.analyzer.analyze(

                    projectPath

                );

            this.context.logs.push(

                `Project: ${analysis.projectName}`

            );

            this.context.logs.push(

                `Angular Version: ${analysis.angularVersion}`

            );

            this.context.logs.push(

                `Workspace: ${analysis.workspaceType}`

            );

            this.context.logs.push(

                `Package Manager: ${analysis.packageManager}`

            );

            const plan =

                this.planner.createPlan(

                    analysis.projectName ?? 'Unknown',

                    analysis.angularVersion,

                    targetVersion

                );

            this.context.plan = plan;

            this.context.logs.push(

                `Migration plan created.`

            );

            this.context.logs.push(

                `Total Steps: ${plan.totalSteps}`

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const packageResult =

                await this.packageUpdater.update(

                    projectPath,

                    plan.targetVersion

                );

            this.context.logs.push(

                `${packageResult.updatedDependencies.length} dependencies updated.`

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const installResult =

                await this.npmInstaller.install(

                    projectPath

                );

            if (!installResult.success) {

                this.context.errors.push(

                    installResult.stderr

                );

                const checkpoints =

                    this.rollbackService.getCheckpoints();

                if (checkpoints.length > 0) {

                    this.rollbackService.rollback(

                        checkpoints[0].id

                    );

                }

                throw new Error(

                    'npm install failed.'

                );

            }

            this.context.logs.push(

                'Dependencies installed successfully.'

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const updateResult =

                await this.angularUpdateExecutor.execute(

                    projectPath,

                    plan

                );

            if (!updateResult.success) {

                this.context.errors.push(

                    updateResult.stderr

                );

                const checkpoints =

                    this.rollbackService.getCheckpoints();

                if (checkpoints.length > 0) {

                    this.rollbackService.rollback(

                        checkpoints[0].id

                    );

                }

                throw new Error(

                    'Angular update failed.'

                );

            }

            this.context.logs.push(

                'Angular migration completed.'

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const buildResult =

                await this.buildService.build(

                    projectPath

                );

            if (!buildResult.success) {

                this.context.errors.push(

                    buildResult.stderr

                );

                const checkpoints =

                    this.rollbackService.getCheckpoints();

                if (checkpoints.length > 0) {

                    this.rollbackService.rollback(

                        checkpoints[0].id

                    );

                }

                throw new Error(

                    'Build failed.'

                );

            }

            this.context.logs.push(

                'Angular build completed.'

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            const validation =

                await this.validatorService.validate(

                    projectPath

                );

            this.context.logs.push(

                'Validation completed.'

            );

            this.context.progress.completedStages++;

            this.context.progress.percentage = Math.round(

                (

                    this.context.progress.completedStages /

                    this.context.progress.totalStages

                ) * 100

            );

            await this.reportService.generate(

                projectPath,

                {

                    projectName: analysis.projectName,

                    filesScanned: 0,

                    filesMigrated: 0,

                    components: 0,

                    modules: 0,

                    services: 0,

                    generatedAt: new Date()

                }

            );

            this.context.logs.push(

                'Migration report generated.'

            );

            this.dashboardService.getDashboard();

            this.context.logs.push(

                'Dashboard refreshed.'

            );

            await this.prGeneratorService.generate(

                projectPath,

                {

                    projectName: analysis.projectName,

                    filesScanned: 0,

                    filesMigrated: 0,

                    components: 0,

                    modules: 0,

                    services: 0,

                    generatedAt: new Date()

                }

            );

            this.context.logs.push(

                'PR summary generated.'

            );

            await this.prGeneratorService.generate(

                projectPath,

                {

                    projectName: analysis.projectName,

                    filesScanned: 0,

                    filesMigrated: 0,

                    components: 0,

                    modules: 0,

                    services: 0,

                    generatedAt: new Date()

                }

            );

            this.context.logs.push(

                'PR summary generated.'

            );

            this.context.progress.completedStages =

                this.context.progress.totalStages;

            this.context.progress.percentage = 100;

            this.context.progress.status = 'Completed';

            this.context.state = ExecutionState.COMPLETED;


            this.context.metrics.elapsedTime =

                Date.now() -

                this.context.metrics.startedAt.getTime();

            this.context.metrics.successfulStages =

                this.context.progress.completedStages;

            this.context.metrics.failedStages =

                this.context.errors.length;

            this.eventBus.publish({

                type: 'MigrationCompleted',

                timestamp: new Date(),

                executionId: this.context.executionId,

                message: 'Enterprise migration completed successfully.'

            });

            this.context.logs.push(

                'Migration completed.'

            );

            this.context.logs.push(

                `Duration : ${this.context.metrics.elapsedTime} ms`

            );

            this.context.logs.push(

                `Successful Stages : ${this.context.metrics.successfulStages}`

            );

            this.context.logs.push(

                `Failed Stages : ${this.context.metrics.failedStages}`

            );



            return {

                executionId:

                    this.context.executionId,

                success:

                    this.context.errors.length === 0,

                state:

                    this.context.state,

                progress:

                    this.context.progress,

                duration:

                    this.context.metrics.elapsedTime,

                message:

                    'Migration completed successfully.',

                successfulStages:

                    this.context.metrics.successfulStages,

                failedStages:

                    this.context.metrics.failedStages

            };

        } catch (error: any) {

            this.context.state = ExecutionState.FAILED;

            this.context.errors.push(

                error.message

            );

            const checkpoints =

                this.rollbackService.getCheckpoints();

            if (checkpoints.length > 0) {

                this.rollbackService.rollback(

                    checkpoints[0].id

                );

            }

            throw error;

        }

    }

    getStatus(): ExecutionContext {

        return this.context;

    }

}
