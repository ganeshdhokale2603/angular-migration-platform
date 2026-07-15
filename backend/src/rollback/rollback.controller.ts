import {

    Body,

    Controller,

    Get,

    Post

} from '@nestjs/common';
import {

    ApiTags,

    ApiOperation,

    ApiResponse,
    ApiBody

} from '@nestjs/swagger';

import { CheckpointRequest } from './models/checkpoint-request.model';
import { RollbackService } from './rollback.service';
import { HistoryRequest } from './models/history-request.model';
import { RecoveryRequest } from './models/recovery-request.model';
import { RollbackRequest } from './models/rollback-request.model';

@ApiTags('Rollback')
@Controller('rollback')
export class RollbackController {

    constructor(

        private readonly rollbackService: RollbackService,


    ) { }

    @Get('status')
    getStatus() {

        return {

            status: this.rollbackService.getStatus()

        };

    }

    @Get('checkpoints')
    getCheckpoints() {

        return this.rollbackService.getCheckpoints();

    }

    @Post('checkpoint')
    createCheckpoint(

        @Body()

        request: CheckpointRequest

    ) {

        return this.rollbackService.createCheckpoint(

            request.projectPath,

            request.description

        );

    }

    @Post('history')
    addHistory(

        @Body()

        request: HistoryRequest

    ) {

        return this.rollbackService.addHistory(

            request.project,

            request.status,

            request.checkpointId

        );

    }

    @Get('history')
    getHistory() {

        return this.rollbackService.getHistory();

    }

    @Post('restore')
    @ApiBody({

    type: RollbackRequest

})
    restore(

        @Body()

        request: RollbackRequest

    ) {

        return this.rollbackService.rollback(

            request.checkpointId

        );

    }

    @Post('recover')
    recover(

        @Body()

        request: RecoveryRequest

    ) {

        return this.rollbackService.automaticRecovery(

            request.migrationSucceeded,

            request.checkpointId

        );

    }

}