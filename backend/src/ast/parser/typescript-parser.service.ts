import { Injectable } from '@nestjs/common';

import { Project } from 'ts-morph';

import { ParserResult } from '../models/parser-result.model';

@Injectable()
export class TypeScriptParserService {

    loadProject(

        tsConfigPath: string

    ): ParserResult {

        const project =

            new Project({

                tsConfigFilePath: tsConfigPath,

                skipAddingFilesFromTsConfig: false

            });

        return {

            project,

            sourceFiles:

                project.getSourceFiles().length,

            tsConfigPath

        };

    }

}