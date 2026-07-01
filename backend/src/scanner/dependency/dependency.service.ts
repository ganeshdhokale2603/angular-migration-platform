import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class DependencyService {
  async buildGraph(files: string[]) {
    const graph: any[] = [];

    for (const file of files) {
      const source = await fs.readFile(file, 'utf8');

      const imports =
        source
          .match(/from\s+['"](.*)['"]/g)
          ?.map((value) =>
            value.replace('from', '').replace(/['"]/g, '').trim(),
          ) ?? [];

      const standalone = source.includes('standalone: true');

      graph.push({
        file,

        type: 'component',

        standalone,

        imports,
      });
    }

    return graph;
  }
}
