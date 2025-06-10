import { fetchGenre } from '@/genre-fetch';
import { Movie } from '@/types/movie';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

type MovieCard = {
    movie: Movie;
};

type Genre = {
    name: string;
    id: number;
}

const Card = ({movie:{id, title, vote_average, original_language, release_date, poster_path,}}: MovieCard) => {
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const getGenre = async() => {
            const genres = await fetchGenre(id);
            setMovieGenres(genres);
        }
        getGenre();
    }, [])
  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 5}}>
        <View
        style={{width: 104, height: 151}}
        >
            <Image
            source={poster_path ? {uri:`https://image.tmdb.org/t/p/w500/${poster_path}`}: require('../assets/images/no-Poster.png')}
            style={{borderRadius: 4, height: 151, width: '100%'}}
            />
        </View>
        <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={{color: 'white', fontWeight: 700, fontSize: 12, lineHeight: 16}}
        >{title ? title : 'N/A'}
        </Text>
        <View
        style={{flexDirection: 'row', gap: 3, marginBottom: 10, 
            alignItems: 'center', justifyContent:'flex-start',}}
        >
            <Image
            style={{height: 10, width: 10}} 
            source={require('../assets/images/star.svg')}></Image>
            <Text
            style={{fontWeight: 'bold', color: 'white', fontSize: 10, lineHeight: 10}}
            >{vote_average.toFixed(1)}</Text>
        </View>
       <FlatList
        data={movieGenres}
        renderItem={({item}) => <Text style={{color: 'gray'}}>{item ? item.name: 'N/A'}</Text>}
        keyExtractor={item => String(item.id)}
        />
    </View>
  )
}

export default Card