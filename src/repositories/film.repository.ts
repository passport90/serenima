/* istanbul ignore file */
import { Inject, Injectable } from '@nestjs/common'
import { PgConstraintError, pgConstraintErrorSchema } from '../types'
import Film from '../entities/film.entity'
import { Pool } from 'pg'
import { UniqueConstraintViolationError } from '../errors'

/**
 * Represents a row retrieved from the film table in the database.
 *
 * @example
 * {
 *   uuid: 'c9912e6f-5a43-42c2-b0a3-9ab235618f10',
 *   imdb_id: 'tt1234567',
 *   title: 'Example Movie Title',
 *   release_date: new Date()
 * }
 */
interface FilmRow {
  /** The unique identifier for the film. */
  uuid: string;

  /** The IMDb ID of the film, a unique identifier for movies on IMDb. */
  imdb_id: string;

  /** The title of the film. */
  title: string;

  /** The release date of the film, with its time component ignored. */
  release_date: Date;
}

/**
 * Repository for Film entities, providing database operations for films.
 */
@Injectable()
export default class FilmRepository {
  /**
   * Creates an instance of `FilmRepository`.
   *
   * @param pgPool - The PostgreSQL connection pool to use for database operations.
   */
  constructor(@Inject('PG_POOL') private pgPool: Pool) { }

  /**
   * Searches for films based on a keyword and returns a list of matching films.
   *
   * @param keyword - The search keyword to match against film titles and release year.
   * @returns A promise that resolves to an array of `Film` objects matching the search criteria.
   */
  search = async (keyword: string): Promise<Film[]> => {
    /** Full-text search query for films using PostgreSQL's `websearch_to_tsquery` function. */
    const tsquery = 'websearch_to_tsquery(\'english\', $1)'

    /** SQL query to retrieve film details based on the search keyword. */
    const query = `
      SELECT uuid, imdb_id, title, release_date
      FROM film
      WHERE title_vector @@ ${tsquery}
      ORDER BY ts_rank(title_vector, ${tsquery}) DESC
    `

    /** PostgreSQL database client for executing queries. */
    const client = await this.pgPool.connect()

    try {
      /** Array of film rows retrieved from the database. */
      const rows = (await client.query(query, [keyword])).rows as FilmRow[]

      return rows.map(row => ({
        uuid: row.uuid,
        imdbId: row.imdb_id,
        title: row.title,
        releaseDate: row.release_date,
      }))
    } finally {
      client.release()
    }
  }

  /**
   * Creates a new `Film` entity in the database.
   *
   * @param film - The `Film` object to be created in the database.
   * @throws {UniqueConstraintViolationError}
   *  Throws an error if there is a unique constraint violation (e.g., duplicate IMDb ID).
   * @returns A promise that resolves when the `Film` is successfully created.
   */
  create = async (film: Film): Promise<void> => {
    /** PostgreSQL database client. */
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
      /** Parsed constraint error for handling unique constraint violations. */
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
