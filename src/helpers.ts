/**
 * Converts a JavaScript Date object to an ISO date string in the "YYYY-MM-DD" format.
 *
 * @param date - The Date object to be converted.
 * @returns The ISO date string in "YYYY-MM-DD" format.
 */
export const toIsoDate = (date: Date): string => {
  /** Extracted year from the date. */
  const year = date.getUTCFullYear()

  /** Month string taken from extracted month from the date. */
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')

  /** Day string taken from extracted month from the date. */
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
