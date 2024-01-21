import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

xdescribe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
  })

  describe('app', () => {
    it('should return movie title', async () => {
      jest.spyOn(appService, 'getOne').mockResolvedValue('movie title')

      expect(await appController.get()).toBe('movie title')
    })
  })
})
