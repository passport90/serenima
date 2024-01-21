/**
 * DTO (Data Transfer Object) used to represent an existing `Film` entity.
 *
 * @example
 * {
 *   uuid: "e1234567-abcd-1234-5678-abcdef123456",
 *   title: "Inception",
 *   imdbId: "tt1375666",
 *   releaseDate: "2022-01-15"
 * }
 */
export default interface FilmDto {
  /** The unique identifier of the `Film` entity. */
  uuid: string;

  /** The title of the film. */
  title: string;

  /** The IMDb ID of the film, which serves as a unique identifier on IMDb. */
  imdbId: string;

  /** The release date of the film in "YYYY-MM-DD" format. */
  releaseDate: string;
}
