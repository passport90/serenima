/** Represents a film entity with details such as UUID, IMDb ID, title, and release date. */
export default interface Film {
  /** A unique identifier for the film. */
  uuid: string
  /** The IMDb ID of the film, a unique identifier for movies on IMDb. */
  imdbId: string
  /** The title of the film. */
  title: string
  /** The release date of the film. Its time component is ignored. */
  releaseDate: Date
}
