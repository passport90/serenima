import { z } from 'zod'

/** Zod schema to validate CreateFilmDto */
export const createFilmSchema = z
  .object({
    title: z.string(),
    imdbId: z.string(),
    releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .required()

type CreateFilmDto = z.infer<typeof createFilmSchema>
export default CreateFilmDto
