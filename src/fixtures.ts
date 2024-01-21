/* istanbul ignore file */
import CreateFilmDto from './dto/create-film.dto'
import Film from './entities/film.entity'
import FilmDto from './dto/film.dto'

export const getSampleFilmDto = (): FilmDto => ({
  uuid: 'e89351df-c143-4714-8a94-33882d1b0919',
  imdbId: 't0123456',
  title: 'Taxi Driver',
  releaseDate: '1976-10-09',
})

export const getSampleFilm = (): Film => {
  const filmDto = getSampleFilmDto()
  return {
    ...filmDto,
    releaseDate: new Date(filmDto.releaseDate),
  }
}

export const getSampleCreateFilmDto = (): CreateFilmDto => {
  const filmDto = getSampleFilmDto()

  return {
    imdbId: filmDto.imdbId,
    title: filmDto.title,
    releaseDate: filmDto.releaseDate,
  }
}
