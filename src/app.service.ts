import 'crypto'
import { CreateFilmDto } from './dto/create-film.dto'
import FilmRepository from './repositories/film.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private filmRepository: FilmRepository) { }

  getOne = async (): Promise<string> => {
    const title = await this.filmRepository.getOneTitle()
    if (title === null) {
      return 'No films in the database.'
    }

    return title
  }

  create = async (createFilmDto: CreateFilmDto): Promise<void> => {
    createFilmDto
    crypto.randomUUID()
    return
  }
}
