import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Checkpoint } from './models/checkpoint.model';

@Injectable()
export class CheckpointService {

    private readonly checkpoints: Checkpoint[] = [];

    create(

        projectPath: string,

        description: string

    ): Checkpoint {

        const checkpoint: Checkpoint = {

            id: randomUUID(),

            projectPath,

            createdAt: new Date(),

            description

        };

        this.checkpoints.push(checkpoint);

        return checkpoint;

    }

    getAll(): Checkpoint[] {

        return this.checkpoints;

    }

    getById(

        id: string

    ): Checkpoint | undefined {

        return this.checkpoints.find(

            checkpoint => checkpoint.id === id

        );

    }

}