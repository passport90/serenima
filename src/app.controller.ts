import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common'
import { CreateFilmDto, createCatSchema } from './dto/create-film.dto'
import { AppService } from './app.service'
import Film from './entities/film.entity'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/search')
  async search(@Param('q') q: string): Promise<{ films: Film[] }> {
    return { films: await this.appService.search(q) }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe<CreateFilmDto>(createCatSchema))
  async create(@Body() createFilmDto: CreateFilmDto): Promise<void> {
    await this.appService.create(createFilmDto)
  }
}
