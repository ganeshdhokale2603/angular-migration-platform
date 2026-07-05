import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class CheckpointService {

    private readonly FILE_NAME =
        'migration-checkpoint.json';

    /**
     * Save migration checkpoint
     */
    async saveCheckpoint(

        projectPath:string,

        data:any

    ){

        const file = path.join(

            projectPath,

            this.FILE_NAME

        );

        await fs.writeJson(

            file,

            data,

            {

                spaces:2

            }

        );

    }

    /**
     * Read checkpoint
     */
    async getCheckpoint(projectPath:string){

        const file = path.join(

            projectPath,

            this.FILE_NAME

        );

        if(!(await fs.pathExists(file))){

            return null;

        }

        return fs.readJson(file);

    }

    /**
     * Delete checkpoint
     */
    async clearCheckpoint(projectPath:string){

        const file = path.join(

            projectPath,

            this.FILE_NAME

        );

        if(await fs.pathExists(file)){

            await fs.remove(file);

        }

    }

}