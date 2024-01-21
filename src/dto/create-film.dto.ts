import { z } from 'zod'

export const createCatSchema = z
  .object({
    title: z.string(),
    imdbId: z.string(),
    releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]\d{2}:\d{2})?$/),
  })
  .required()

export type CreateFilmDto = z.infer<typeof createCatSchema>
