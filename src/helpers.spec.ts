import { toIsoDate } from './helpers'

describe('toIsoDate function', () => {
  test.each([
    [new Date('2023-01-15T12:34:56Z'), '2023-01-15'],
    [new Date('2021-12-31T01:22:26Z'), '2021-12-31'],
    [new Date('2022-05-20T23:59:59Z'), '2022-05-20'],
  ])('converts a Date object to ISO date string', (inputDate, expectedIsoDate) => {
    const isoDate = toIsoDate(inputDate)

    expect(isoDate).toBe(expectedIsoDate)
  })
})
