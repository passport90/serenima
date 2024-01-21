import 'crypto'
import { CreateFilmDto } from './dto/create-film.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() { }

  getOne = async (): Promise<string> => {
    return 'hello world'
  }

  create = async (createFilmDto: CreateFilmDto): Promise<void> => {
    createFilmDto
    crypto.randomUUID()
    return
  }
}
