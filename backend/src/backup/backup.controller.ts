import {
    Body,
    Controller,
    Delete,
    Get,
    Post,Query
} from '@nestjs/common';

import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {

    constructor(

        private readonly backup: BackupService

    ) {}

    @Post('create')

    async create(

        @Body('projectPath')

        projectPath: string

    ) {

        return await this.backup.create(

            projectPath

        );

    }

    @Delete('delete')

    async delete(

        @Body('backupPath')

        backupPath: string

    ) {

        await this.backup.delete(

            backupPath

        );

        return {

            deleted: true

        };

    }

    @Get('exists')

    async exists(

         @Query('backupPath')

        backupPath: string

    ) {

        return {

            exists:

                await this.backup.exists(

                    backupPath

                )

        };

    }

}