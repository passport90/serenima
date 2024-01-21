/**
 * Represents a film entity with details such as UUID, IMDb ID, title, and release date.
 *
 * @example
 * {
 *   uuid: "e1234567-abcd-1234-5678-abcdef123456",
 *   imdbId: "tt1375666",
 *   title: "Inception",
 *   releaseDate: new Date()
 * }
 */
export default interface Film {
  /** A unique identifier for the film. */
  uuid: string;

  /** The IMDb ID of the film, which serves as a unique identifier for movies on IMDb. */
  imdbId: string;

  /** The title of the film. */
  title: string;

  /** The release date of the film, with its time component ignored. */
  releaseDate: Date;
}
