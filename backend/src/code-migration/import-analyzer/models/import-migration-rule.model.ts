export type ImportMigrationAction =
    | 'KEEP'
    | 'MODERNIZE'
    | 'REPLACE'
    | 'REMOVE'
    | 'REVIEW';

export type ImportMigrationRisk =
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH';

export interface ImportMigrationRule {

    module: string;

    importName: string;

    action: ImportMigrationAction;

    risk: ImportMigrationRisk;

    reason: string;

    replacement?: string;

}