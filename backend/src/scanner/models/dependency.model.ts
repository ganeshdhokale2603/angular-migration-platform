export interface DependencyNode {
  file: string;

  type: string;

  imports: string[];

  standalone: boolean;
}
