import Card from "@/components/Card";
import NavigationBar from "@/components/NavigationBar";
import { VITE_TMDB_API_KEY } from "@/config";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, Text, TextInput, View } from "react-native";
import { useDebounce } from 'use-debounce';
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
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);


  const fetchMovies = async(query = '') => {
    setIsLoading(true);
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}` :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  },[debouncedSearchTerm])

  return (
    <ImageBackground
    source={require('../assets/images/hero-bg.png')}
    style={styles.background}
    >
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 10, paddingTop: 40, paddingBottom: 30}}>
          <Image
          source={require('../assets/images/logo.png')}
          style={{alignSelf: 'center'}}
          />
          <View style={styles.input}>
            <Image
            source={require('../assets/images/search.png')}
            style={{position: 'absolute', left:20,}}
            />
            <TextInput
            style={{color: '#A8B5DB', fontWeight: 400, fontSize: 14, paddingLeft: 40, 
              width: '100%', height: '100%', outlineWidth: 0,}}
            onChangeText={setSearchTerm}
            value={searchTerm}
            placeholder="Search through 300+ movies online"
            />
          </View>
        </View>
        <Text style={[styles.h1, {marginTop: 10, marginLeft: 30}]}>All Movies</Text>
        <View style={{flex: 1, marginBottom: 60}}>
            {isLoading ? (
              <ActivityIndicator
              style={{marginTop: 40}} 
              size='large' 
              color={'blue'}/>
            ): movieList ? (
              <FlatList
              data={movieList}
              renderItem={({item, index}) => index === 19 ? (
               <>
                <Card movie={item}></Card>
                <View style={{flex:1}}></View>
               </> 
              ): <Card movie={item}></Card>}
              keyExtractor={item => String(item.id)}
              numColumns={3}
              style={{padding: 20, paddingBottom: 40}}
              />
            ): 'N/A'}
        </View>
        <NavigationBar></NavigationBar>
      </View>
    </ImageBackground>
  )
}
