export interface AngularImport {

    module: string;

    imports: string[];

    defaultImport?: string;

    namespaceImport?: string;

    isAngularImport: boolean;

    isCoreImport: boolean;

}