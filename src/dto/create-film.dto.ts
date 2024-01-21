import { z } from 'zod'

/**
 * Zod schema to validate `CreateFilmDto`.
 * This schema is used to validate the properties of `CreateFilmDto` before creating a `Film` entity.
 */
export const createFilmSchema = z
  .object({
    /**
     * The title of the film.
     *
     * @example "Inception"
     */
    title: z.string(),

    /**
     * The IMDb ID of the film.
     *
     * @example "tt1375666"
     */
    imdbId: z.string(),

    /**
     * The release date of the film in "YYYY-MM-DD" format.
     *
     * @example "2022-01-15"
     */
    releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .required()

/**
 * DTO (Data Transfer Object) used for creating a `Film` entity.
 * This DTO defines the properties required to create a `Film` entity.
 */
type CreateFilmDto = z.infer<typeof createFilmSchema>
export default CreateFilmDto
