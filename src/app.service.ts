import 'crypto'
import { UniqueConstraintViolationError, ValidationError } from './exceptions'
import { CreateFilmDto } from './dto/create-film.dto'
import Film from './entities/film.entity'
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
    const releaseDate = new Date(createFilmDto.releaseDate)
    if (isNaN(releaseDate.getTime())) {
      throw new ValidationError(['`releaseDate` field is semantically incorrect.'])
    }

    const film: Film = {
      ...createFilmDto,
      uuid: crypto.randomUUID(),
      releaseDate,
    }

    try {
      await this.filmRepository.create(film)
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationError) {
        throw new ValidationError([`The specified \`${error.getViolatedField()}\` is already taken.`])
      }

      throw error
    }
  }
}
