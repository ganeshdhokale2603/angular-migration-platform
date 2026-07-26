import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';
import { randomUUID } from 'crypto';

import { BackupInfo } from './models/backup-info.model';

@Injectable()
export class BackupService {

    private readonly backupRoot = path.join(
        process.cwd(),
        'migration-backups'
    );

    async create(
        projectPath: string
    ): Promise<BackupInfo> {

        await fs.ensureDir(this.backupRoot);

        const id = randomUUID();

        const backupPath = path.join(
            this.backupRoot,
            id
        );

        await fs.copy(
            projectPath,
            backupPath
        );

        return {
            id,
            originalProject: projectPath,
            backupPath,
            createdAt: new Date()
        };
    }

    async restore(
        backup: BackupInfo
    ): Promise<void> {

        const exists = await fs.pathExists(
            backup.backupPath
        );

        if (!exists) {
            throw new Error('Backup not found.');
        }

        await fs.remove(
            backup.originalProject
        );

        await fs.copy(
            backup.backupPath,
            backup.originalProject
        );
    }

    async delete(
        backupPath: string
    ): Promise<void> {

        await fs.remove(
            backupPath
        );
    }

    async exists(
        backupPath: string
    ): Promise<boolean> {

        return fs.pathExists(
            backupPath
        );
    }

}