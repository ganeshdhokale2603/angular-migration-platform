import {

    ArgumentsHost,

    Catch,

    ExceptionFilter,

    HttpException,

    HttpStatus

} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter
    implements ExceptionFilter {

    catch(

        exception: unknown,

        host: ArgumentsHost

    ) {

        const ctx =
            host.switchToHttp();

        const response =
            ctx.getResponse();

        const request =
            ctx.getRequest();

        const status =

            exception instanceof HttpException

                ? exception.getStatus()

                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =

            exception instanceof HttpException

                ? exception.message

                : 'Internal Server Error';

        response.status(status).json({

            success: false,

            timestamp: new Date(),

            path: request.url,

            statusCode: status,

            message

        });

    }

}