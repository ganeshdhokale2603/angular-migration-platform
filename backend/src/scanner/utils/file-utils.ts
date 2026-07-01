import * as fs from 'fs-extra';

export class FileUtils {
    /*** Read text file*/
    static async readFile(filePath: string): Promise<string> {
        return fs.readFile(filePath, 'utf8');
    }

  /*** Check if file exists */
  static async exists(filePath: string): Promise<boolean> {
    return fs.pathExists(filePath);
  }

  /*** Read JSON file*/
  static async readJson(filePath: string): Promise<any> {
    return fs.readJson(filePath);
  }
}
