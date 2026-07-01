import { BadRequestException, Injectable } from '@nestjs/common';

import simpleGit from 'simple-git';

import * as path from 'path';

import { WorkspaceService } from './workspace/workspace.service';

@Injectable()
export class GitService {
  constructor(private workspace: WorkspaceService) {}

  async cloneRepository(url: string) {
    const folder = await this.workspace.createWorkspace();

    const git = simpleGit();

    try {
      await git.clone(url, folder);
    } catch {
      throw new BadRequestException('Unable to clone repository.');
    }

    return {
      path: folder,
    };
  }
}
