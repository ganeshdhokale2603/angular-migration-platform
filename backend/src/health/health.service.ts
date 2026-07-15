import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

    getHealth() {

        return {

            status: 'UP',

            timestamp: new Date(),

            uptime: process.uptime(),

            memory: process.memoryUsage(),

            nodeVersion: process.version

        };

    }

}