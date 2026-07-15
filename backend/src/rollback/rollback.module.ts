import { Module } from '@nestjs/common';
import { RollbackController } from './rollback.controller';
import { RollbackService } from './rollback.service';
import { CheckpointService } from './checkpoint.service';
import { HistoryService } from './history.service';
import { GitService } from './git.service';

@Module({

    controllers: [

        RollbackController

    ],

    providers: [

        RollbackService,
        CheckpointService,
        HistoryService,
        GitService

    ],

    exports: [

        RollbackService,
        CheckpointService,
        HistoryService,
        GitService

    ]

})
export class RollbackModule { }