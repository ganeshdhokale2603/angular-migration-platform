import { Module } from '@nestjs/common';

import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';
import { ValidationReportService } from './report.service';

@Module({

    controllers: [ValidationController],

    providers: [ValidationService, ValidationReportService],

    exports: [ValidationService]

})
export class ValidationModule {}