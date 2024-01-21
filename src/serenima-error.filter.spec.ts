import { ArgumentsHost, HttpStatus } from '@nestjs/common'
import { SerenimaError, ValidationError } from './errors'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Response } from 'express'
import { SerenimaErrorFilter } from './serenima-error.filter'

describe('SerenimaErrorFilter', () => {
  let serenimaErrorFilter: SerenimaErrorFilter
  let mockResponse: Partial<Response>

  beforeEach(() => {
    serenimaErrorFilter = new SerenimaErrorFilter()
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  test('handle ValidationError and return a BAD_REQUEST response', () => {
    const validationError = new ValidationError(['Issue 1', 'Issue 2'])
    const mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      } as HttpArgumentsHost),
    } as ArgumentsHost

    serenimaErrorFilter.catch(validationError, mockArgumentsHost)

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(mockResponse.json).toHaveBeenCalledWith({
      issues: ['Issue 1', 'Issue 2'],
      message: 'Validation failed.',
    })
  })

  test('handle other SerenimaErrors and return an INTERNAL_SERVER_ERROR response', () => {
    const serenimaError = new SerenimaError('Generic error')
    const mockArgumentsHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      } as HttpArgumentsHost),
    } as ArgumentsHost

    serenimaErrorFilter.catch(serenimaError, mockArgumentsHost)

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error.' })
  })
})
