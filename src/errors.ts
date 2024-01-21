/** Represents a base error class for the Serenima application. */
export class SerenimaError extends Error { }

/** Represents an error for validation issues in the Serenima application. */
export class ValidationError extends SerenimaError {
  /**
   * Creates an instance of ValidationError.
   *
   * @param issues - An array of issue strings describing the validation problems.
   */
  constructor(private issues: string[]) {
    super()
  }

  /**
   * Retrieves the validation issues as an array of strings.
   *
   * @returns An array of strings describing the validation problems.
   */
  getIssues = (): string[] => [...this.issues]
}

/** Represents an error for unique constraint violations in the Serenima application. */
export class UniqueConstraintViolationError extends SerenimaError {
  /**
   * Creates an instance of UniqueConstraintViolationError.
   *
   * @param field - The name of the field that has a unique constraint violation.
   */
  constructor(private field: string) {
    super()
  }

  /**
   * Retrieves the name of the field with the unique constraint violation.
   *
   * @returns The name of the field with the unique constraint violation.
   */
  getViolatedField = (): string => this.field
}
