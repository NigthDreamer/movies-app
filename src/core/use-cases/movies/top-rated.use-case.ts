import {HttpAdapter} from '../../../config/adapters';
import {TopRatedResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<TopRatedResponse>('/top_rated', {
      params: {
        page: options?.page ?? 1,
      },
    });

    return topRated.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching movies - TopRated');
  }
};
