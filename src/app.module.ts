import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Pool } from 'pg'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PG_POOL',
      useFactory: () => new Pool({ connectionString: process.env.DATABASE_URL }),
    },
  ],
})
export class AppModule { }
