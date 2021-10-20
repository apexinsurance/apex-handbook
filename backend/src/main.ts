import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as Sentry from '@sentry/node'

async function bootstrap() {
  Sentry.init({
    dsn: process.env.sentry_dsn,
  })

  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  await app.listen(3000)
}
bootstrap()
