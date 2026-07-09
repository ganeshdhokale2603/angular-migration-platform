import { Injectable } from '@nestjs/common';
import { DeadCodeAnalyzer } from './dead-code-analyzer';
import { TreeShakingService } from './tree-shaking.service';
import { DeadCodeReport } from './dead-code.report';

@Injectable()
export class DeadCodeService {
  private analyzer = new DeadCodeAnalyzer();

  constructor(private readonly tree: TreeShakingService) {}

  private report: DeadCodeReport = {
    filesScanned: 0,

    unusedImports: 0,

    unusedProviders: 0,

    unusedComponents: 0,

    unusedServices: 0,

    treeShakingScore: 100,
  };

  analyze(file: string, source: string) {
    const result = this.analyzer.analyze(file, source);

    this.report.filesScanned++;

    this.report.unusedImports += result.unusedImports;

    this.report.unusedProviders += result.unusedProviders;

    this.report.unusedComponents += result.unusedComponents;

    this.report.unusedServices += result.unusedServices;

    this.report.treeShakingScore = this.tree.calculate(this.report);

    return result;
  }

  getReport() {
    return this.report;
  }
}
