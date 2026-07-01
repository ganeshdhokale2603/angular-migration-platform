import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { MigrationRequestDto } from '../dto/migration-request.dto';
import { ProjectAnalyzerService } from '../project-analyzer/project-analyzer.service';
import { GitService } from 'src/git/git.service';
import { ScannerService } from 'src/scanner/scanner.service';

@Injectable()
export class MigrationService {
  constructor(
    private readonly gitService: GitService,

    private readonly analyzer: ProjectAnalyzerService,
    private readonly scanner: ScannerService,
    private readonly ruleEngine: RuleEngineService
  ) {}

  async startMigration(request: MigrationRequestDto) {
    const cloned = await this.gitService.cloneRepository(request.repositoryUrl);

    const projectInfo = await this.analyzer.analyze(cloned.path);

    // Scan project structure
    const scan = await this.scanner.scan(cloned.path);

    const issues =
      this.ruleEngine.evaluate({

      projectInfo,

      statistics: scan.statistics,

      files: scan.files,

      dependencyGraph:
      scan.dependencyGraph

      });

    if (!projectInfo.isAngularProject) {
      throw new Error('Repository is not an Angular project.');
    }

    return {
      jobId: uuid(),
      status: 'SCANNED',
      repository: cloned.path,
      message: 'Angular project scanned successfully.',
      projectInfo,
      scan:{
        ...scan,
        issues
      }
    };
  }
}
