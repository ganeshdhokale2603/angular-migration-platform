export interface RepositoryInfo {

    name: string;

    path: string;

    type: 'Application' | 'Library';

    framework: string;

    migrated: boolean;

}