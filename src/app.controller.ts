import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common'
import CreateFilmDto, { createCatSchema } from './dto/create-film.dto'
import { AppService } from './app.service'
import FilmListDto from './dto/film-list.dto'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'
import { toIsoDate } from './helpers'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/search')
  async search(@Query('q') q: string): Promise<FilmListDto> {
    const films = await this.appService.search(q)
    return { films: films.map(film => ({ ...film, releaseDate: toIsoDate(film.releaseDate) })) }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe<CreateFilmDto>(createCatSchema))
  async create(@Body() createFilmDto: CreateFilmDto): Promise<void> {
    await this.appService.create(createFilmDto)
  }
}
