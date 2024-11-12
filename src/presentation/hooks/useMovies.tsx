import {useCallback, useEffect, useState} from 'react';
import {Movie} from '../../core/entities';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters';

let popularPageNumber = 1;
let topRatedPageNumber = 1;
let upcomingPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const initialLoad = useCallback(async () => {
    const nowPlayingMoviesPromise =
      UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularMoviesPromise = UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedMoviesPromise =
      UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const upcomingMoviesPromise =
      UseCases.moviesUpcomingUseCase(movieDBFetcher);

    const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
      await Promise.all([
        nowPlayingMoviesPromise,
        popularMoviesPromise,
        topRatedMoviesPromise,
        upcomingMoviesPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    // Methods
    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {
          page: popularPageNumber,
        },
      );

      setPopular(prev => [...prev, ...popularMovies]);
    },
    topRatedNextPage: async () => {
      topRatedPageNumber++;
      const topRatedMovies = await UseCases.moviesTopRatedUseCase(
        movieDBFetcher,
        {
          page: topRatedPageNumber,
        },
      );

      setTopRated(prev => [...prev, ...topRatedMovies]);
    },
    upcomingNextPage: async () => {
      upcomingPageNumber++;
      const upcomingMovies = await UseCases.moviesUpcomingUseCase(
        movieDBFetcher,
        {
          page: upcomingPageNumber,
        },
      );

      setUpcoming(prev => [...prev, ...upcomingMovies]);
    },
  };
};
