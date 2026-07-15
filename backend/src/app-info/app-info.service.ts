import { Injectable } from '@nestjs/common';

@Injectable()

export class AppInfoService {

    getInfo() {

        return {

            application:

                'Angular Migration Platform',

            version:

                '1.0.0',

            environment:

                process.env.NODE_ENV ||

                'development',

            author:

                'Ganesh Dhokale'

        };

    }

}