import { Test, TestingModule } from '@nestjs/testing'
import { getSampleCreateFilmDto, getSampleFilm } from './fixtures'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import FilmListDto from './dto/film-list.dto'

// Create a mock of the AppService
const mockAppService = {
  search: jest.fn(),
  create: jest.fn(),
}

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile()

    appController = module.get<AppController>(AppController)
  })

  describe('search', () => {
    test('return a list of films', async () => {
      // Prepare
      const q = 'taxi'
      const mockFilms = [
        { ...getSampleFilm(), releaseDate: new Date('1955-04-13') },
        {
          uuid: '57897e29-dcb3-42aa-a9ba-ceef993eebe0',
          imdbId: 't098745',
          title: 'Sherlock, Jr.',
          releaseDate: new Date('1924-04-10'),
        },
      ]

      mockAppService.search.mockResolvedValue(mockFilms)

      // Execute
      const result = await appController.search(q)

      // Assert
      const expectedFilmListDto: FilmListDto = {
        films: [
          { ...mockFilms[0], releaseDate: '1955-04-13' },
          { ...mockFilms[1], releaseDate: '1924-04-10' },
        ],
      }
      expect(result).toStrictEqual(expectedFilmListDto)
      expect(mockAppService.search).toHaveBeenCalledWith(q)
    })
  })

  describe('create', () => {
    it('should create a film', async () => {
      // Prepare
      const createFilmDto = getSampleCreateFilmDto()

      // Execute
      await appController.create(createFilmDto)

      // Assert
      expect(mockAppService.create).toHaveBeenCalledWith(createFilmDto)
    })
  })
})
