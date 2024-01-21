import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common'
import { CreateFilmDto, createCatSchema } from './dto/create-film.dto'
import { AppService } from './app.service'
import { FilmList } from './dto/film-list.dto'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/search')
  async search(@Query('q') q: string): Promise<FilmList> {
    return { films: await this.appService.search(q) }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe<CreateFilmDto>(createCatSchema))
  async create(@Body() createFilmDto: CreateFilmDto): Promise<void> {
    await this.appService.create(createFilmDto)
  }
}
