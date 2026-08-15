export interface ProjectFile {

    path: string;

    name: string;

    extension: string;

    size: number;

    category:
        | 'typescript'
        | 'html'
        | 'scss'
        | 'css'
        | 'json'
        | 'other';

}