/** Represents a film entity with details such as UUID, IMDb ID, title, and release date. */
export default interface Film {
  /** A unique identifier for the film. */
  uuid: string
  /** The IMDb ID of the film, a unique identifier for movies on IMDb. */
  imdb_id: string
  /** The title of the film. */
  title: string
  /** The release date of the film in ISO 8601 format (e.g., "YYYY-MM-DD"). */
  release_date: string
}
