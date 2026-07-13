import { Injectable } from '@nestjs/common';
import { WorkspaceDetectorService } from './workspace-detector.service';
import { RepositoryScannerService } from './repository-scanner.service';
import { DependencyGraphService } from './dependency-graph.service';
import { IncrementalMigrationService } from './incremental-migration.service';

@Injectable()
export class MonorepoService {

    constructor(private readonly workspaceDetectorService: WorkspaceDetectorService,
        private readonly repositoryScanner: RepositoryScannerService,
        private readonly dependencyGraph: DependencyGraphService,
        private readonly incrementalMigration: IncrementalMigrationService
    ) { }

    getStatus(): string {
        return 'Monorepo module ready';
    }
    detectWorkspace(projectPath: string) {
        return this.workspaceDetectorService.detect(projectPath);
    }

    scanRepositories( projectPath: string ) {
        return this.repositoryScanner.scan(projectPath);
    }

    buildDependencyGraph(projectPath: string) {
        return this.dependencyGraph.build(projectPath);
    }

    createMigrationPlan(

    projects: string[]

) {

    return this.incrementalMigration.createPlan(

        projects

    );

}

}