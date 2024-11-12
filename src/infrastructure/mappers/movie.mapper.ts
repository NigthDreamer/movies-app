import {FullMovie, Movie} from '../../core/entities';
import type {MovieDBMovie, Result} from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBResultToEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }

  static fromMovieDBToEntity(movie: MovieDBMovie): FullMovie {
    return {
      id: movie.id,
      budget: movie.budget,
      description: movie.overview,
      duration: movie.runtime,
      genres: movie.genres.map(genre => genre.name),
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map(
        company => company.name,
      ),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    };
  }
}
