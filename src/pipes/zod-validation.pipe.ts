import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: unknown): T {
    try {
      return this.schema.parse(value) as T
    } catch (error: unknown) {
      throw new BadRequestException('Validation failed.')
    }
  }
}
