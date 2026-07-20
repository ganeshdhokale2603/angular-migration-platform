import { Project } from 'ts-morph';

export interface AstProject {

    project: Project;

    totalFiles: number;

    tsConfigPath: string;

}