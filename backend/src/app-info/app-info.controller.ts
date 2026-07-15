import {

    Controller,

    Get

} from '@nestjs/common';

import {

    ApiTags

} from '@nestjs/swagger';

import { AppInfoService } from './app-info.service';

@ApiTags('Application')

@Controller('app')

export class AppInfoController {

    constructor(

        private readonly appInfoService: AppInfoService

    ) {}

    @Get()

    getInfo() {

        return this.appInfoService.getInfo();

    }

}