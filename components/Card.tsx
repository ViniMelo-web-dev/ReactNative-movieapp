import { Movie } from '@/types/movie';
import React from 'react';
import { Image, Text, View } from 'react-native';

type MovieCard = {
    movie: Movie;
};

const Card = ({movie} : MovieCard) => {
  return (
    <View>
        <Image
        source={{uri:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
        style={{width: 104, height: 151}}
        />
        <Text
        style={{color: 'white', fontWeight: 700, fontSize: 12}}
        >{movie.title}</Text>
    </View>
  )
}

export default Card