import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import { MigrationDashboard } from './dashboard.model';

@Injectable()
export class MigrationDashboardService {
  async generate(projectPath: string, dashboard: MigrationDashboard) {
    const file = path.join(projectPath, 'migration-dashboard.json');

    await fs.writeJson(file, dashboard, {
      spaces: 2,
    });

    return file;
  }
}
