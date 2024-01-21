import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common'
import CreateFilmDto, { createFilmSchema } from './dto/create-film.dto'
import { AppService } from './app.service'
import FilmListDto from './dto/film-list.dto'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'
import { toIsoDate } from './helpers'

@Controller()
export class AppController {
  /**
   * Creates an instance of the `AppController`.
   *
   * @param appService - The `AppService` instance for handling application logic.
   */
  constructor(private readonly appService: AppService) { }

  /**
   * Handles HTTP GET requests for searching films.
   *
   * @param q - The search query string provided as a query parameter.
   * @returns A promise that resolves to a `FilmListDto` containing the list of matching films.
   */
  @Get('/search')
  async search(@Query('q') q: string): Promise<FilmListDto> {
    /** The result of the search operation, representing a list of films. */
    const films = await this.appService.search(q)

    return { films: films.map(film => ({ ...film, releaseDate: toIsoDate(film.releaseDate) })) }
  }

  /**
   * Handles HTTP POST requests for creating new films.
   *
   * @param createFilmDto - The DTO (Data Transfer Object) containing film creation data.
   * @returns A promise that resolves when the film creation is successful.
   */
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe<CreateFilmDto>(createFilmSchema))
  async create(@Body() createFilmDto: CreateFilmDto): Promise<void> {
    await this.appService.create(createFilmDto)
  }
}
