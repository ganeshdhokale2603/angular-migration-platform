import { Project } from 'ts-morph';

export interface ParserResult {

    project: Project;

    sourceFiles: number;

    tsConfigPath: string;

}