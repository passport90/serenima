import { ZodError, ZodSchema } from 'zod'
import { PipeTransform } from '@nestjs/common'
import { ValidationError } from 'src/exceptions'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: unknown): T {
    try {
      return this.schema.parse(value) as T
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues.map(issue => JSON.stringify(issue)))
      }

      throw error
    }
  }
}
