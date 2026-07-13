import { Module } from '@nestjs/common';
import { MonorepoController } from './monorepo.controller';
import { MonorepoService } from './monorepo.service';
import { WorkspaceDetectorService } from './workspace-detector.service';
import { RepositoryScannerService } from './repository-scanner.service';
import { DependencyGraphService } from './dependency-graph.service';
import { IncrementalMigrationService } from './incremental-migration.service';

@Module({

    controllers: [
        MonorepoController
    ],

    providers: [
        MonorepoService,
        WorkspaceDetectorService,
        RepositoryScannerService,
        DependencyGraphService,
        IncrementalMigrationService
    ],

    exports: [
        MonorepoService,
        WorkspaceDetectorService,
        RepositoryScannerService,
        DependencyGraphService,
        IncrementalMigrationService
    ]

})
export class MonorepoModule { }