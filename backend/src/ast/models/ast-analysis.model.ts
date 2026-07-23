import { AstFile } from './ast-file.model';
import { AstComponent } from './ast-component.model';
import { AngularMetadata } from './angular-metadata.model';

export interface AstAnalysis {

    projectName: string;

    totalSourceFiles: number;

    totalComponents: number;

    totalModules: number;

    totalServices: number;

    totalDirectives: number;

    totalPipes: number;

    files: AngularMetadata[];
     components: AstComponent[];

}