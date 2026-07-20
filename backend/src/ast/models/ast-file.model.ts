export interface AstFile {

    fileName: string;

    filePath: string;

    extension: string;

    size: number;

    hasComponent: boolean;

    hasModule: boolean;

    hasInjectable: boolean;

    hasDirective: boolean;

    hasPipe: boolean;

}