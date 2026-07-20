import { AstFile } from './ast-file.model';
import { AstComponent } from './ast-component.model';

export interface AstAnalysis {

    projectName: string;

    totalSourceFiles: number;

    totalComponents: number;

    totalModules: number;

    totalServices: number;

    totalDirectives: number;

    totalPipes: number;

    files: AstFile[];
     components: AstComponent[];

}