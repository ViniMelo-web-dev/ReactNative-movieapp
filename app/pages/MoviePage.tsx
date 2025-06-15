import { fetchMovieId } from '@/fetch-movie-id';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


interface movieType {
  poster_path: string;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  overview: string;
  status: string;
}


const MoviePage = () => {
  const { id }  = useLocalSearchParams() as { id: string | undefined };
  const [movie, setMovie] = useState<movieType>();
  const navigation = useRouter();


  const formatTime = (totalMinutes: number) : string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  const formatDate = (prevDate: string) : string => {

    if(!prevDate) return 'N/A';
    const date =  new Date(prevDate);
    
    const formatedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    });

    const dateFormated = formatedDate.format(date);
    
    return dateFormated;
  }

    const newTime = useMemo (() => formatTime(movie?.runtime as number) as string, [movie?.release_date])
    const newDate = useMemo(() => formatDate(movie?.release_date as string) as string, [movie?.release_date])

  useEffect(() => {
    const getMovieById = async () => {
      const movieInfo = await fetchMovieId(id as string) as movieType;
      setMovie(movieInfo);
      console.log(movie);
    }
    getMovieById();
  }, [id])

  return (
    <View
    style={{flex: 1}}
    >
        <View
        style={{height: 447}}
        >
          <Image
          style={{flex: 1}}
          source={movie ? {uri : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} : require('../../assets/images/no-Poster.png')}
          />
        </View>
        <View
        style={{flex: 1, backgroundColor: '#030014', padding: 20, gap: 10}}
        >
          <Text
          style={{color: 'white', fontWeight: 700, fontSize: 20, lineHeight: 28}}
          >{movie?.title ?? 'N/A'}</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={{color: '#A8B5DB'}}>{movie?.release_date.split('-', 1) ?? 'N/A'}</Text>
            <Text style={{color: '#A8B5DB'}}>•</Text>
            <Text style={{color: '#A8B5DB'}}>{(movie && movie.runtime) ? newTime : 'N/A'}</Text>
          </View>
          <View style={{width: 116, height: 30, backgroundColor: '#221F3D', borderRadius: 4, 
            alignItems: 'center', flexDirection: 'row', gap: 5, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8}}>
            <Image
            source={require('../../assets/images/star.png')}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontWeight: 600}}>{movie?.vote_average.toFixed(1)}</Text>
              <Text style={{color: '#A8B5DB'}}>/10</Text>
            </View>
            <Text style={{color: '#A8B5DB'}}>({movie?.vote_count ?? 'N/A'})</Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={{color: '#A8B5DB'}}>Overview</Text>
            <Text style={{color: 'white', lineHeight: 25}}>{movie?.overview ?? 'N/A'}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 150}}>
            <View style={{gap: 5}}>
              <Text style={{color: '#A8B5DB'}}>Release date</Text>
              <Text style={{color: '#D6C7FF', fontWeight: 600, fontSize: 14}}>{newDate ? newDate : 'N/A'}</Text>
            </View>
            <View style={{gap: 5}}>
              <Text style={{color: '#A8B5DB'}}>Status</Text>
              <Text style={{color: '#D6C7FF', fontWeight: 600, fontSize: 14}}>{movie?.status ?? 'N/A'}</Text>
            </View>
          </View>
          <TouchableOpacity
          onPress={() => navigation.push('/')}
          style={{width: 353, height: 36, marginTop: 40,}}>
            <LinearGradient
            colors={['#D6C7FF', '#AB8BFF']}
            style={{flex: 1, borderRadius: 4, justifyContent: 'center', alignItems: 'center',  padding: 20}}
            >
              <Text>Visit Homepage</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default MoviePage