import { Movie } from '@/types/movie';
import React from 'react';
import { Image, Text, View } from 'react-native';

type MovieCard = {
    movie: Movie;
};

const Card = ({movie}: MovieCard) => {
  return (
    <View style={{flex: 1}}>
        <View
        style={{height: 151, width: 104}}
        >
            <Image
            source={{uri:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
            style={{height: '100%', width: '100%', borderRadius: 4}}
            />
        </View>
        <Text
        style={{color: 'white', fontWeight: 700, fontSize: 12}}
        >{movie.title}
        </Text>
        <View
        style={{flexDirection: 'row', gap: 3}}
        >
            <Image source={require('../assets/images/star.svg')}></Image>
            <Text
            style={{color: 'gray'}}
            >{movie.vote_average.toFixed(1)}</Text>
        </View>
        <View>
            {movie.genres.length > 0 ? movie.genres.map(() => (
                <View></View>
            )) : 'N/A'}
        </View>
    </View>
  )
}

export default Card