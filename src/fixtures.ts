/* istanbul ignore file */

import CreateFilmDto from './dto/create-film.dto'
import Film from './entities/film.entity'
import FilmDto from './dto/film.dto'

/**
 * Returns a sample `FilmDto` object with predefined values for testing or demonstration.
 *
 * @returns A sample `FilmDto` object.
 */
export const getSampleFilmDto = (): FilmDto => ({
  uuid: 'e89351df-c143-4714-8a94-33882d1b0919',
  imdbId: 't0123456',
  title: 'Taxi Driver',
  releaseDate: '1976-10-09',
})

/**
 * Returns a sample `Film` object with predefined values for testing or demonstration.
 *
 * @returns A sample `Film` object.
 */
export const getSampleFilm = (): Film => {
  const filmDto = getSampleFilmDto()
  return {
    ...filmDto,
    releaseDate: new Date(filmDto.releaseDate),
  }
}

/**
 * Returns a sample `CreateFilmDto` object with predefined values for testing or demonstration.
 *
 * @returns A sample `CreateFilmDto` object.
 */
export const getSampleCreateFilmDto = (): CreateFilmDto => {
  const filmDto = getSampleFilmDto()

  return {
    imdbId: filmDto.imdbId,
    title: filmDto.title,
    releaseDate: filmDto.releaseDate,
  }
}
