import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
} from 'react-native';
import {Movie} from '../../../core/entities';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export const HorizontalCarousel = ({movies, title, loadNextPage}: Props) => {
  const containerHeight = title ? 260 : 220;

  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) {
      return;
    }

    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndReached) {
      return;
    }

    isLoading.current = true;

    // Cargar las siguientes peliculas
    loadNextPage && loadNextPage();
  };

  return (
    <View style={{...styles.container, height: containerHeight}}>
      {title && <Text style={styles.text}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  text: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 10,
  },
});
