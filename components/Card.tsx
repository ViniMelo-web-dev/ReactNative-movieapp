import { fetchGenre } from '@/genre-fetch';
import { MovieCard } from '@/types/movieCard';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


type Genre = {
    name: string;
    id: number;
}

const Card = ({movie:{id, title, vote_average, original_language, release_date, poster_path,}}: MovieCard) => {
    const navigation = useRouter();
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);


    useEffect(() => {
        const getGenre = async() => {
            const genres = await fetchGenre(id);
            setMovieGenres(genres);
        }
        getGenre();
    }, [])
  return (
    <TouchableOpacity
    onPress={() => navigation.push({ pathname: '/pages/MoviePage', params: { id } })}
    style={{flex: 1, flexDirection: 'column', gap: 3, marginBottom: 30, marginRight: 10}}>
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
        style={{flexDirection: 'row', gap: 3, 
            alignItems: 'center', justifyContent:'flex-start',}}
        >
            <Image
            style={{height: 10, width: 10}} 
            source={require('../assets/images/star.png')}></Image>
            <Text
            style={{fontWeight: 'bold', color: 'white', fontSize: 10, lineHeight: 10}}
            >{vote_average.toFixed(1)}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flex: 1, alignItems: 'center'}}>
        {movieGenres ? movieGenres.map((item, index) => (
        <React.Fragment key={item.id}>
            <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
                color: 'gray',
                fontSize: 10,
                fontWeight: '700',
                lineHeight: 14,
                flexShrink: 1, 
            }}
            >
            {item?.name ?? 'N/A'}
            </Text>
            {index < movieGenres.length - 1 && (
            <Text style={{color: 'gray', marginHorizontal: 4}}>•</Text>
            )}
        </React.Fragment>
        )) : 'N/A'}

        </View>
    </TouchableOpacity>
  )
}

export default Card