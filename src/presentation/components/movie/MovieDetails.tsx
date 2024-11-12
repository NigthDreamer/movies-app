import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Cast, FullMovie} from '../../../core/entities';
import {Formatter} from '../../../config/helpers';
import {CastActor} from '../cast';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text>{movie.rating}</Text>
          <Text style={styles.genres}>- {movie.genres.join(', ')}</Text>
        </View>
        <Text style={styles.descriptionHeader}>Historia</Text>
        <Text style={styles.description}>{movie.description}</Text>
        <Text style={styles.budgetHeader}>Presupuesto</Text>
        <Text style={styles.budget}>{Formatter.currency(movie.budget)}</Text>
      </View>

      <View style={styles.castingContainer}>
        <Text style={styles.castingHeader}>Actores</Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor actor={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  info: {
    flexDirection: 'row',
  },
  genres: {
    marginLeft: 5,
  },
  descriptionHeader: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  budgetHeader: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold',
  },
  budget: {
    fontSize: 18,
  },
  castingContainer: {
    marginTop: 10,
    marginBottom: 50,
  },
  castingHeader: {
    fontSize: 23,
    marginVertical: 10,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});
