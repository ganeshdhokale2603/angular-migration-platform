import { Body, Controller, Post } from '@nestjs/common';

import { MigrationService } from '../service/migration.service';

import { MigrationRequestDto } from '../dto/migration-request.dto';

@Controller('api/migration')
export class MigrationController {

  constructor(
    private readonly migrationService: MigrationService
  ) {}

  @Post('start')
  startMigration(
    @Body() request: MigrationRequestDto
  ) {
    return this.migrationService.startMigration(request);
  }
}