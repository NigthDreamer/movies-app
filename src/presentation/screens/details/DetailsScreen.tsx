import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView} from 'react-native';
import {RootStackParams} from '../../navigation';
import {useMovie} from '../../hooks';
import {FullScreenLoader, MovieDetails, MovieHeader} from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <MovieHeader
        originalTitle={movie!.originalTitle}
        title={movie!.title}
        poster={movie!.poster}
      />
      <MovieDetails movie={movie!} cast={cast!} />
    </ScrollView>
  );
};
