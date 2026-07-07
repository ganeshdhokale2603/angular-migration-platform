import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class HtmlParserService {
  async read(file: string): Promise<string> {
    return fs.readFile(file, 'utf8');
  }

  async save(file: string, html: string): Promise<void> {
    await fs.writeFile(file, html, 'utf8');
  }
}
