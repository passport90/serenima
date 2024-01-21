import { ZodError, ZodSchema } from 'zod'
import { PipeTransform } from '@nestjs/common'
import { ValidationError } from '../errors'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) { }

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
