import FilmDto from './film.dto'

/** DTO (Data Transfer Object) used when listing `Film` entities. */
export default interface FilmListDto {
  /** List of Film entities. */
  films: FilmDto[];
}
