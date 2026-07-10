import { MigrationReport } from '../report/models/migration-report';
import { AIReport } from './ai.report';

export interface AIProvider {

  analyze(

    report: MigrationReport

  ): Promise<AIReport>;

}