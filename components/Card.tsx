import { Movie } from '@/types/movie';
import React from 'react';
import { Image, Text, View } from 'react-native';

type MovieCard = {
    movie: Movie;
};

const Card = ({movie:{title, vote_average, original_language, release_date, poster_path,}}: MovieCard) => {
  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 5}}>
        <View
        >
            <Image
            source={{uri:`https://image.tmdb.org/t/p/w500/${poster_path}`}}
            style={{height: '100%', width: '100%', borderRadius: 4}}
            />
        </View>
        <Text
        style={{color: 'white', fontWeight: 700, fontSize: 15,}}
        >{title}
        </Text>
        <View
        style={{flexDirection: 'row', gap: 3, marginBottom: 10}}
        >
            <Image source={require('../assets/images/star.svg')}></Image>
            <Text
            style={{fontWeight: 'bold', color: 'white'}}
            >{vote_average.toFixed(1)}</Text>
        </View>
    </View>
  )
}

export default Card