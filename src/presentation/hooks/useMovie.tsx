import {useCallback, useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters';
import {Cast, FullMovie} from '../../core/entities';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  const loadMovie = useCallback(async () => {
    setIsLoading(true);

    const fullMoviePromise = UseCases.getMovieByIdUseCase(
      movieDBFetcher,
      movieId,
    );

    const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [fullMovieResponse, castResponse] = await Promise.all([
      fullMoviePromise,
      castPromise,
    ]);

    setMovie(fullMovieResponse);
    setCast(castResponse);

    setIsLoading(false);
  }, [movieId]);

  useEffect(() => {
    loadMovie();
  }, [movieId, loadMovie]);

  return {
    movie,
    cast,
    isLoading,
  };
};
