export interface MigrationTask {

    project: string;

    order: number;

}

export interface MigrationPlan {

    totalProjects: number;

    tasks: MigrationTask[];

}