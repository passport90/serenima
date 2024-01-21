import { Inject, Injectable } from '@nestjs/common'
import Film from 'src/entities/film.entity'
import { Optional } from 'src/types'
import { Pool } from 'pg'

@Injectable()
export default class FilmRepository {
  constructor(@Inject('PG_POOL') private pgPool: Pool) { }

  getOneTitle = async (): Promise<Optional<string>> => {
    const client = await this.pgPool.connect()

    const res = await client.query('SELECT title FROM film LIMIT 1')

    client.release()

    if (res.rowCount === 0) {
      return null
    }

    return (res.rows as { title: string }[])[0].title
  }

  create = async (film: Film): Promise<void> => {
    const client = await this.pgPool.connect()

    await client.query(`
      INSERT INTO film
      (uuid, imdb_id, title, release_date, title_vector, created_at, updated_at)
      VALUES
      (
        $1, $2, $3, $4,
        to_tsvector('english', $2) || to_tsvector('english', EXTRACT(YEAR FROM $4)::TEXT)),
        NOW(),
        NOW()
      )
    `, [film.uuid, film.title, film.imdbId, film.releaseDate])

    client.release()
  }
}
