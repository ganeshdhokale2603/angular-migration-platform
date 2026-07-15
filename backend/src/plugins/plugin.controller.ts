import {

    Controller,

    Get

} from '@nestjs/common';

import { PluginManager } from './plugin.manager';

@Controller('plugins')

export class PluginController {

    constructor(

        private readonly pluginManager: PluginManager

    ) {}

    @Get()

    getPlugins() {

        return this.pluginManager.getPlugins();

    }

}