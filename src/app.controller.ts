import { Body, Controller, Get, HttpCode, Post, UsePipes } from '@nestjs/common'
import { CreateFilmDto, createCatSchema } from './dto/create-film.dto'
import { AppService } from './app.service'
import { ZodValidationPipe } from './pipes/zod-validation.pipe'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async get(): Promise<string> {
    return await this.appService.getOne()
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body() createFilmDto: CreateFilmDto): Promise<string> {
    this.appService.create(createFilmDto)

    return 'Created.'
  }
}
