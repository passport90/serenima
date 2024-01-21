/* istanbul ignore file */
import { z } from 'zod'

export const pgConstraintErrorSchema = z
  .object({
    name: z.string().refine(value => value === 'error'),
    code: z.string().regex(/^\d+$/),
    severity: z.string().refine(value => value === 'ERROR'),
    constraint: z.string(),
  })
  .required()

export type PgConstraintError = z.infer<typeof pgConstraintErrorSchema>
