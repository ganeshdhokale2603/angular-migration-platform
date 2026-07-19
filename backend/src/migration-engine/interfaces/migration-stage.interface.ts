import { ExecutionContext } from '../models/execution-context';

export interface MigrationStage {

    execute(
        context: ExecutionContext
    ): Promise<void>;

}