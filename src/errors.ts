export class SerenimaError extends Error { }

export class ValidationError extends SerenimaError {
  constructor(private issues: string[]) {
    super()
  }

  getIssues = (): string[] => [...this.issues]
}

export class UniqueConstraintViolationError extends SerenimaError {
  constructor(private field: string) {
    super()
  }

  getViolatedField = (): string => this.field
}
