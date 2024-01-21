/* istanbul ignore file */

import { z } from 'zod'

/** A Zod schema for validating PostgreSQL constraint error objects. */
export const pgConstraintErrorSchema = z
  .object({
    /** The name of the PostgreSQL error. */
    name: z.string().refine(value => value === 'error'),

    /** The error code associated with the PostgreSQL error. */
    code: z.string().regex(/^\d+$/),

    /** The severity of the PostgreSQL error (e.g., 'ERROR'). */
    severity: z.string().refine(value => value === 'ERROR'),

    /** The constraint name associated with the PostgreSQL error. */
    constraint: z.string(),
  })
  .required()

/** A type representing a PostgreSQL constraint error based on `pgConstraintErrorSchema`. */
export type PgConstraintError = z.infer<typeof pgConstraintErrorSchema>
