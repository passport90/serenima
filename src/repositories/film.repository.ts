import { Inject, Injectable } from '@nestjs/common'
import { Optional } from 'src/types'
import { Pool } from 'pg'

@Injectable()
export default class FilmRepository {
  constructor(@Inject('PG_POOL') private pgPool: Pool) { }

  getOneTitle = async (): Promise<Optional<string>> => {
    const client = await this.pgPool.connect()

    const res = await client.query('SELECT title FROM film LIMIT 1')
    if (res.rowCount === 0) {
      return null
    }

    return (res.rows as { title: string }[])[0].title
  }
}
