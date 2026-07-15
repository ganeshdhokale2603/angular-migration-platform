import { Injectable } from '@nestjs/common';

import { MigrationPlugin } from './plugin.interface';

import { AIPlugin } from './ai.plugin';

import { RollbackPlugin } from './rollback.plugin';

import { DashboardPlugin } from './dashboard.plugin';

@Injectable()
export class PluginManager {

    constructor(

        private readonly aiPlugin: AIPlugin,

        private readonly rollbackPlugin: RollbackPlugin,

        private readonly dashboardPlugin: DashboardPlugin

    ) {}

    private readonly plugins: MigrationPlugin[] = [];

    initialize() {

        this.plugins.push(

            this.aiPlugin,

            this.rollbackPlugin,

            this.dashboardPlugin

        );

    }

    getPlugins() {

        return this.plugins;

    }

    async executeAll() {

        for (const plugin of this.plugins) {

            await plugin.execute();

        }

    }

}