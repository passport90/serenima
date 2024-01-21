/* istanbul ignore file */
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
