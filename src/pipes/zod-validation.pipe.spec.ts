import { ValidationError } from '../errors'
import { ZodValidationPipe } from './zod-validation.pipe'
import { z } from 'zod'

interface SampleObject {
  id: number
  name: string
}

describe('ZodValidationPipe', () => {
  let zodValidationPipe: ZodValidationPipe<SampleObject>

  beforeEach(() => {
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    })
    zodValidationPipe = new ZodValidationPipe(schema)
  })

  test('transform the value when it matches the schema', () => {
    // Prepare
    const validData = {
      id: 123,
      name: 'Marhadiasha',
    }

    // Execute
    const result = zodValidationPipe.transform(validData)

    // Assert
    expect(result).toEqual(validData)
  })

  test.each([
    { id: '123', name: 'Marhadiasha' },
    { id: 123, name: 34 },
    { id: 123 },
  ])('throw a ValidationError when the value does not match the schema', (invalidData: unknown) => {
    expect(() => zodValidationPipe.transform(invalidData)).toThrow(ValidationError)
  })
})
