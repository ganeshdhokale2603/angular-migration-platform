export interface MigrationPlugin {

    name: string;

    version: string;

    execute(): Promise<void>;

}