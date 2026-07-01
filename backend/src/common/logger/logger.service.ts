import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {

private logger=new Logger("Migration");

log(message:string){

this.logger.log(message);

}

error(message:string){

this.logger.error(message);

}

}