import 'crypto'
import { UniqueConstraintViolationError, ValidationError } from './errors'
import CreateFilmDto from './dto/create-film.dto'
import Film from './entities/film.entity'
import FilmRepository from './repositories/film.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private filmRepository: FilmRepository) { }

  search = async (keyword: string): Promise<Film[]> => await this.filmRepository.search(keyword)

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
