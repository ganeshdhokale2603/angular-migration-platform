export interface DependencyNode {

    name: string;

    dependencies: string[];

}

export interface DependencyGraph {

    nodes: DependencyNode[];

}