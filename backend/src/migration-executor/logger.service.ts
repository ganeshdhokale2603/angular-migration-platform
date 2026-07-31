import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class LoggerService {

    private readonly logDirectory = path.join(

        process.cwd(),

        'migration-logs'

    );

    private readonly logFile = path.join(

        this.logDirectory,

        'migration.log'

    );

    async log(

        message: string

    ): Promise<void> {

        await fs.ensureDir(

            this.logDirectory

        );

        const line =

            `[${new Date().toISOString()}] ${message}\n`;

        await fs.appendFile(

            this.logFile,

            line

        );

    }

    getLogFile(): string {

        return this.logFile;

    }

}