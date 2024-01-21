import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { SerenimaError, ValidationError } from './errors'
import { Response } from 'express'

/** A custom exception filter for handling Serenima application errors. */
@Catch(SerenimaError)
export class SerenimaErrorFilter implements ExceptionFilter {
  constructor() { }

  /**
   * Handles exceptions thrown within the Serenima application.
   *
   * @param exception - The caught exception instance.
   * @param host - The `ArgumentsHost` object containing context information.
   */
  catch(exception: SerenimaError, host: ArgumentsHost): void {
    /** Obtains the HTTP context from the `ArgumentsHost` object. */
    const ctx = host.switchToHttp()

    /** Represents the HTTP response object used to send HTTP responses. */
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
