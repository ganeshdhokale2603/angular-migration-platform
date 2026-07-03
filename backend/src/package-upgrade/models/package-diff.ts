export interface PackageChange {

    dependency: string;

    oldVersion: string;

    newVersion: string;

}

export interface PackageDiff {

    updated: PackageChange[];

}