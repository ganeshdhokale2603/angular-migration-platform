import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PluginManager } from './plugins/plugin.manager';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const pluginManager =

    app.get(PluginManager);

pluginManager.initialize();

await pluginManager.executeAll();

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  app.enableVersioning({

    type: VersioningType.URI

});
app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Angular Migration Platform API')
    .setDescription('Enterprise Angular Migration Platform APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config
  );

  SwaggerModule.setup(
    'api',
    app,
    document
  );

  await app.listen(3000);

  console.log('Server running on http://localhost:3000');
}

bootstrap();