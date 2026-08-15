import { ImportInfo } from './import-info.model';
import { ClassInfo } from './class-info.model';

export interface AstResult {

    filePath: string;

    imports: ImportInfo[];

    classes: ClassInfo[];

}