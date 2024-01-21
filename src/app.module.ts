import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import FilmRepository from './repositories/film.repository'
import { Module } from '@nestjs/common'
import { Pool } from 'pg'
import { SerenimaErrorFilter } from './exception-filter.filter'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PG_POOL',
      useFactory: (): Pool => new Pool({ connectionString: process.env.DATABASE_URL }),
    },
    {
      provide: 'APP_FILTER',
      useClass: SerenimaErrorFilter,
    },
    FilmRepository,
  ],
})
export class AppModule { }
