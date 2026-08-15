import { ProjectFile } from './project-file.model';

export interface ProjectScanResult {

    projectPath: string;

    totalFiles: number;

    typescriptFiles: number;

    htmlFiles: number;

    scssFiles: number;

    cssFiles: number;

    jsonFiles: number;

    files: ProjectFile[];

}