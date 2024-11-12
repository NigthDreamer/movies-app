import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMovies} from '../../hooks';
import {
  FullScreenLoader,
  HorizontalCarousel,
  PosterCarousel,
} from '../../components';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          marginTop: top + styles.container.marginTop,
        }}>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/* Populares */}
        <HorizontalCarousel
          movies={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />

        {/* Populares */}
        <HorizontalCarousel
          movies={topRated}
          title="Mejor Valoradas"
          loadNextPage={topRatedNextPage}
        />

        {/* Populares */}
        <HorizontalCarousel
          movies={upcoming}
          title="Próximamente"
          loadNextPage={upcomingNextPage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 30,
  },
});
