import { z } from 'zod'

export const createCatSchema = z
  .object({
    title: z.string(),
    imdb_id: z.string(),
    release_date: z.string().datetime(),
  })
  .required()

export type CreateFilmDto = z.infer<typeof createCatSchema>
