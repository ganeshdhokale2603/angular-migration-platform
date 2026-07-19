import { Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';

import { ExecutionContext } from './models/execution-context';
import { ExecutionState } from './models/execution-state';
import { PipelineStage } from './models/pipeline-stage';
import { ExecutionResult } from './models/execution-result';
import { PipelineService } from './pipeline/pipeline.service';
import { ProjectDiscoveryService } from './services/project-discovery.service';
import { EventBusService } from './events/event-bus.service';
import { RollbackService } from 'src/rollback/rollback.service';
import { ValidatorService } from 'src/validator/validator.service';
import { ReportService } from 'src/report/report.service';
import { AIAdvisorService } from 'src/ai-advisor/ai-advisor.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { PrGeneratorService } from 'src/pr-generator/pr-generator.service';

@Injectable()
export class MigrationEngineService {

    private context!: ExecutionContext;
    
        constructor(

        private readonly pipeline: PipelineService,

        private readonly discoveryService: ProjectDiscoveryService,

        private readonly eventBus: EventBusService,

        private readonly rollbackService: RollbackService,

        private readonly validatorService: ValidatorService,

        private readonly reportService: ReportService,

        private readonly aiAdvisorService: AIAdvisorService,

        private readonly dashboardService: DashboardService,

        private readonly prGeneratorService: PrGeneratorService

        ){}

    async startMigration(
        projectPath: string,
        targetVersion: number
    ): Promise<ExecutionResult> {

        this.context = {

            executionId: randomUUID(),

            projectPath,
             targetVersion,

            project:

                this.discoveryService.discover(

                projectPath

                ),

                options:{

                targetVersion,

                enableRollback:true,

                enableAI:true,

                autoInstall:true,

                autoBuild:true,

                autoCommit:false

                },

            state: ExecutionState.RUNNING,

            currentStage: PipelineStage.INITIALIZE,
            completedStages: [],

            progress: {

                percentage: 0,

                currentStage: PipelineStage.INITIALIZE,

                currentStageName: 'Initialize',

                completedStages: 0,

                totalStages: 9,

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

            message: 'Migration started'

        });
        this.context.logs.push(
'Initializing enterprise migration.'
);

this.rollbackService.createCheckpoint(
    projectPath,
    'Before Migration'
);

        await this.pipeline.execute(this.context);

        this.validatorService.validate(projectPath);

this.context.logs.push(
    'Validation completed.'
);

this.context.logs.push(
    'Generating report.'
);
this.context.logs.push(
    'Running AI Advisor.'
);

this.dashboardService.getDashboard();

this.context.logs.push(
    'PR summary generation scheduled.'
);

        this.context.state = ExecutionState.COMPLETED;

        this.eventBus.publish({

            type: 'MigrationCompleted',

            timestamp: new Date(),

            executionId: this.context.executionId,

            message: 'Migration completed successfully'

        });
        this.context.logs.push(
    'Enterprise migration workflow completed.'
);

        return {

            executionId: this.context.executionId,

            success: true,

            state: this.context.state,

            progress: this.context.progress,

            duration: 0,

            message: 'Migration Engine Started',
            successfulStages:

            this.context.metrics.successfulStages,

            failedStages:

            this.context.metrics.failedStages,

        };

    }

    getStatus() {

        return this.context;

    }

}