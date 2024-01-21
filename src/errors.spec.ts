import { UniqueConstraintViolationError, ValidationError } from './errors'

describe('ValidationError', () => {
  test('create an instance of ValidationError and return the list of issues', () => {
    const issues = ['Issue 1', 'Issue 2']
    const validationError = new ValidationError(issues)

    expect(validationError).toBeInstanceOf(ValidationError)
    expect(validationError.getIssues()).toEqual(issues)
  })
})

describe('UniqueConstraintViolationError', () => {
  test('create an instance of UniqueConstraintViolationError and return the violated field', () => {
    const field = 'username'
    const uniqueConstraintError = new UniqueConstraintViolationError(field)

    expect(uniqueConstraintError).toBeInstanceOf(UniqueConstraintViolationError)
    expect(uniqueConstraintError.getViolatedField()).toEqual(field)
  })
})
