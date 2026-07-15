import { Module } from '@nestjs/common';

import { PluginManager } from './plugin.manager';

import { AIPlugin } from './ai.plugin';

import { RollbackPlugin } from './rollback.plugin';

import { DashboardPlugin } from './dashboard.plugin';
import { PluginController } from './plugin.controller';

@Module({
    controllers: [

    PluginController

],

    providers: [

        PluginManager,

        AIPlugin,

        RollbackPlugin,

        DashboardPlugin

    ],

    exports: [

        PluginManager

    ]

})

export class PluginModule {}