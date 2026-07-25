import { Injectable } from '@nestjs/common';

import { MigrationAnalyzerService } from './analyzer/migration-analyzer.service';

@Injectable()
export class AiService {

    constructor(

        private readonly analyzer: MigrationAnalyzerService

    ) {}

    analyze(

        projectPath: string

    ) {

        return this.analyzer.analyze(

            projectPath

        );

    }

}