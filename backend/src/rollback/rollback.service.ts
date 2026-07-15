import { Injectable } from '@nestjs/common';

import { CheckpointService } from './checkpoint.service';
import { HistoryService } from './history.service';
import { GitService } from './git.service';
import { RollbackResult } from './models/rollback-result.model';
import { RecoveryResult } from './models/recovery-result.model';

@Injectable()
export class RollbackService {

    constructor(

         private readonly checkpointService: CheckpointService,

    private readonly historyService: HistoryService,

    private readonly gitService: GitService

    ) {}

    getStatus(): string {

        return 'Rollback Engine Ready';

    }

    createCheckpoint(

        projectPath: string,

        description: string

    ) {

        return this.checkpointService.create(

            projectPath,

            description

        );

    }

    getCheckpoints() {

        return this.checkpointService.getAll();

    }

    addHistory(

    project: string,

    status: 'SUCCESS' | 'FAILED' | 'ROLLED_BACK',

    checkpointId: string

) {

    return this.historyService.add(

        project,

        status,

        checkpointId

    );

}

getHistory() {

    return this.historyService.getAll();

}

rollback(

    checkpointId: string

): RollbackResult {

    const checkpoint =
        this.checkpointService.getById(

            checkpointId

        );

    if (!checkpoint) {

        return {

            success: false,

            restoredCheckpoint: checkpointId,

            message: 'Checkpoint not found'

        };

    }

    if (

        !this.gitService.isGitRepository(

            checkpoint.projectPath

        )

    ) {

        return {

            success: false,

            restoredCheckpoint: checkpointId,

            message: 'Not a Git repository'

        };

    }

    const restored =
        this.gitService.restore(

            checkpoint.projectPath

        );

    if (restored) {

        this.historyService.add(

            checkpoint.projectPath,

            'ROLLED_BACK',

            checkpoint.id

        );

    }

    return {

        success: restored,

        restoredCheckpoint: checkpoint.id,

        message:

            restored

                ? 'Rollback completed successfully.'

                : 'Rollback failed.'

    };

}

automaticRecovery(

    migrationSucceeded: boolean,

    checkpointId: string

): RecoveryResult {

    if (migrationSucceeded) {

        return {

            migrationSucceeded: true,

            rollbackExecuted: false,

            message: 'Migration completed successfully.'

        };

    }

    const rollbackResult =

        this.rollback(

            checkpointId

        );

    return {

        migrationSucceeded: false,

        rollbackExecuted:

            rollbackResult.success,

        message:

            rollbackResult.message

    };

}

}