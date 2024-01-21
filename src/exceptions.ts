export class SerenimaError extends Error { }

export class ValidationError extends SerenimaError {
  constructor(private issues: string[]) {
    super()
  }

  getIssues = (): string[] => this.issues
}
