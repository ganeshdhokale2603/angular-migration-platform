import { Module } from '@nestjs/common';
import { GitService } from './git.service';
import { WorkspaceService } from './workspace/workspace.service';



@Module({

providers:[

GitService,

WorkspaceService

],

exports:[GitService]

})

export class GitModule{}