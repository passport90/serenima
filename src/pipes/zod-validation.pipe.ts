import { ZodError, ZodSchema } from 'zod'
import { PipeTransform } from '@nestjs/common'
import { ValidationError } from '../errors'

/**
 * `ZodValidationPipe` is a Nest.js `PipeTransform` implementation that uses Zod schemas
 * for input data validation.
 *
 * @template T The type of the expected validated value.
 */
export class ZodValidationPipe<T> implements PipeTransform {
  /**
   * Creates an instance of `ZodValidationPipe`.
   *
   * @param schema - The Zod schema used for validation.
   */
  constructor(private schema: ZodSchema) { }

  /**
   * Transforms the input value by validating it against the provided Zod schema.
   *
   * @param value - The value to be validated.
   * @returns The validated value if successful.
   * @throws {ValidationError} If the value does not match the schema.
   * @throws {Error} If an unknown error occurs (not a `ZodError`).
   */
  transform(value: unknown): T {
    try {
      return this.schema.parse(value) as T
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues.map(issue => JSON.stringify(issue)))
      }

      /* istanbul ignore next */
      throw error
    }
  }
}
