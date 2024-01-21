import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { SerenimaError, ValidationError } from './exceptions'
import { Response } from 'express'

@Catch(SerenimaError)
export class SerenimaErrorFilter implements ExceptionFilter {
  constructor() { }

  catch(exception: SerenimaError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof ValidationError) {
      response
        .status(HttpStatus.BAD_REQUEST)
        .json({
          issues: exception.getIssues(),
          message: 'Validation failed.',
        })

      return
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error.' })
  }
}
