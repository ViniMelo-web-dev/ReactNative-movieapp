import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import { VITE_TMDB_API_KEY } from "@/config";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import styles from '../style/shared';

const API_KEY = VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

export default function Index() {

  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  const fetchMovies = async() => {
    setIsLoading(true);
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
  
      if(!response.ok){
        throw new Error('Error getting response');
      }

      const data = await response.json();
      if(data.Response === 'False'){
        throw new Error('Error getting data results');
      }

      setMovieList(data.results || []);

    } catch(error){
      setErrorMessage((error as Error).message || 'Error fetching data');
      console.log(errorMessage);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <ImageBackground
    source={require('../assets/images/hero-bg.png')}
    style={styles.background}
    >
      <View style={{padding: 70, flex: 1}}>
        <Image
        source={require('../assets/images/logo.png')}
        style={{alignSelf: 'center'}}
        />
        <View style={styles.input}>
          <Image
          source={require('../assets/images/search.svg')}
          style={{position: 'absolute', left:15}}
          />
          <TextInput
          style={{color: '#A8B5DB', fontWeight: 400, fontSize: 14, paddingLeft: 40, 
            width: '100%', height: '100%', outlineWidth: 0}}
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholder="Search through 300+ movies online"
          />
        </View>
        <Text style={[styles.h1, {marginTop: 30}]}>All Movies</Text>
        <ScrollView style={{flex: 1, width: '100%', flexDirection: "row", flexWrap: 'wrap'}}>
          {isLoading ? (
            <Spinner></Spinner>
          ): movieList ? movieList.map((movie) => (
            <Card key={movie.id} movie={movie}></Card>
          )) : 'N/A'}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
