import 'crypto'
import { UniqueConstraintViolationError, ValidationError } from './errors'
import CreateFilmDto from './dto/create-film.dto'
import Film from './entities/film.entity'
import FilmRepository from './repositories/film.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  /**
   * Creates an instance of the `AppService`.
   *
   * @param filmRepository - The `FilmRepository` instance for handling film-related data.
   */
  constructor(private filmRepository: FilmRepository) { }

  /**
   * Searches for films based on a keyword.
   *
   * @param keyword - The search keyword to match against film titles and release year.
   * @returns A promise that resolves to an array of `Film` objects matching the search criteria.
   */
  search = async (keyword: string): Promise<Film[]> => await this.filmRepository.search(keyword)

  /**
   * Creates a new film entity in the database.
   *
   * @param createFilmDto - The DTO (Data Transfer Object) containing film creation data.
   * @returns A promise that resolves when the film is successfully created.
   * @throws {ValidationError} Throws a validation error if there are validation issues.
   */
  create = async (createFilmDto: CreateFilmDto): Promise<void> => {
    /** The release date parsed from the DTO as a JavaScript `Date` object. */
    const releaseDate = new Date(createFilmDto.releaseDate)

    if (isNaN(releaseDate.getTime())) {
      throw new ValidationError(['`releaseDate` field is semantically incorrect.'])
    }

    /** The film object to be created in the database, including generated UUID. */
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
