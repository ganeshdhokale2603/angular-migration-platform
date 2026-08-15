export interface StandaloneImport {

    name: string;

    source: string;

    type:
        | 'ANGULAR'
        | 'COMPONENT'
        | 'DIRECTIVE'
        | 'PIPE';

}