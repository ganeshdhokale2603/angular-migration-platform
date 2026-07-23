import { Injectable } from '@nestjs/common';

import * as fs from 'fs-extra';
import * as path from 'path';

import { MigrationRuleSet } from '../models/migration-rule-set.model';

@Injectable()
export class RuleLoaderService {

    async load(version: number): Promise<MigrationRuleSet> {

        const file = path.join(

            process.cwd(),

            'src',

            'rules',

            'assets',

            `angular-${version}-rules.json`

        );

        if (!(await fs.pathExists(file))) {

            throw new Error(

                `Rule file not found: ${file}`

            );

        }

        return await fs.readJson(file);

    }

}