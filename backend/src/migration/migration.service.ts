import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { MigrationRequestDto } from './dto/migration-request.dto';

@Injectable()
export class MigrationService {

  startMigration(
    request: MigrationRequestDto
  ) {

    return {

      jobId: uuid(),

      status: 'STARTED',

      message: 'Migration started successfully.',

      request

    };

  }

}