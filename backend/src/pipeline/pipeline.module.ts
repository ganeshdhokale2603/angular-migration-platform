import { Module } from '@nestjs/common';

import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';

import { MigrationEngineModule } from '../migration-engine/migration-engine.module';
import { AiModule } from '../ai/ai.module';
import { RulesModule } from '../rules/rules.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { BackupModule } from '../backup/backup.module';
import { RollbackModule } from '../rollback/rollback.module';

@Module({

    imports: [

        MigrationEngineModule,
        AiModule,
        RulesModule,
        WorkspaceModule,
        BackupModule,
        RollbackModule

    ],

    controllers: [

        PipelineController

    ],

    providers: [

        PipelineService

    ],

    exports: [

        PipelineService

    ]

})
export class PipelineModule {}