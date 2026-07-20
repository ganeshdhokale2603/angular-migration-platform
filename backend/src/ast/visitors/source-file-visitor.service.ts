import { Injectable } from '@nestjs/common';

import {

    Project,

    SourceFile

} from 'ts-morph';

@Injectable()
export class SourceFileVisitorService {

    visit(

        project: Project

    ): SourceFile[] {

        return project.getSourceFiles();

    }

}