
import { UniqueConstraintViolationError, ValidationError } from './errors'
import { getSampleCreateFilmDto, getSampleFilm } from './fixtures'
import { AppService } from './app.service'
import CreateFilmDto from './dto/create-film.dto'
import Film from './entities/film.entity'
import FilmRepository from './repositories/film.repository'

describe('AppService', () => {
  let appService: AppService
  let filmRepository: FilmRepository

  beforeEach(() => {
    filmRepository = {
      search: jest.fn(),
      create: jest.fn(),
    } as unknown as FilmRepository
    appService = new AppService(filmRepository)
  })

  describe('search', () => {
    it('should call filmRepository.search with the provided keyword', async () => {
      // Prepare
      const keyword = 'taxi driver'

      const films: Film[] = [getSampleFilm()]
      filmRepository.search = jest.fn().mockResolvedValue(films)

      // Execute
      const result = await appService.search(keyword)

      // Assert
      expect(result).toEqual(films)

      expect(filmRepository.search).toHaveBeenCalledWith(keyword)
    })

  })

  describe('create', () => {
    let createFilmDto: CreateFilmDto

    beforeEach(() => {
      createFilmDto = getSampleCreateFilmDto()
    })

    it('should create a film successfully', async () => {
      // Prepare
      filmRepository.create = jest.fn()

      // Execute
      await expect(appService.create(createFilmDto)).resolves.not.toThrow()

      // Assert
      expect(filmRepository.create).toHaveBeenCalledWith(
        {
          ...createFilmDto,
          uuid: expect.any(String),
          releaseDate: new Date('1976-10-09'),
        },
      )
    })

    it('should throw a ValidationError for invalid releaseDate', async () => {
      // Prepare
      createFilmDto.releaseDate = '2023-13-29'

      // Execute & assert
      await expect(appService.create(createFilmDto)).rejects.toThrow(ValidationError)
    })

    it('should throw a ValidationError for UniqueConstraintViolationError', async () => {
      // Prepare
      filmRepository.create = jest.fn().mockRejectedValue(new UniqueConstraintViolationError('imdbId'))

      // Execute & assert
      await expect(appService.create(createFilmDto)).rejects.toThrow(ValidationError)
    })

    it('should re-throw other errors', async () => {
      // Prepare
      filmRepository.create = jest.fn().mockRejectedValue(new Error('Some other error.'))

      // Execute & assert
      await expect(appService.create(createFilmDto)).rejects.toThrow('Some other error.')
    })
  })
})
