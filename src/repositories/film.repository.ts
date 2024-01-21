import { Inject, Injectable } from '@nestjs/common'
import { PgConstraintError, pgConstraintErrorSchema } from 'src/types'
import Film from 'src/entities/film.entity'
import { Pool } from 'pg'
import { UniqueConstraintViolationError } from 'src/exceptions'

interface FilmRow {
  uuid: string
  imdb_id: string
  title: string
  release_date: Date
}

@Injectable()
export default class FilmRepository {
  constructor(@Inject('PG_POOL') private pgPool: Pool) { }

  search = async (keyword: string): Promise<Film[]> => {
    const tsquery = 'to_tsquery(\'english\', $1)'
    const query = `
        SELECT uuid, imdb_id, title, release_date
        FROM film
        WHERE title_vector @@ ${tsquery}
        ORDER BY ts_rank(title_vector, ${tsquery}) DESC
      `
    const client = await this.pgPool.connect()
    try {
      const rows = (await client.query(query, [keyword])).rows as FilmRow[]

      return rows.map(row => ({
        uuid: row.uuid,
        imdbId: row.imdb_id,
        title: row.title,
        releaseDate: row.release_date,
      }))
    }
    finally {
      client.release()
    }
  }

  create = async (film: Film): Promise<void> => {
    const client = await this.pgPool.connect()
    try {
      await client.query(`
      INSERT INTO film
      (uuid, imdb_id, title, release_date, title_vector, created_at, updated_at)
      VALUES
      (
        $1, $2, $3, $4,
        to_tsvector('english', $3) || to_tsvector('english', EXTRACT(YEAR FROM $4::DATE)::TEXT),
        NOW(),
        NOW()
      )
    `, [film.uuid, film.imdbId, film.title, film.releaseDate])
    } catch (error: unknown) {
      const constraintError = pgConstraintErrorSchema.parse(error) as PgConstraintError
      if (constraintError.code === '23505' && constraintError.constraint === 'film_imdb_id_key') {
        throw new UniqueConstraintViolationError('imdbId')
      }

      throw error
    } finally {
      client.release()
    }
  }
}
