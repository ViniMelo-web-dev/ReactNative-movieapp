import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const MoviePage = () => {
  const id  = useLocalSearchParams();
  return (
    <View>
        <View
        style={{height: 447}}
        >
        </View>
    </View>
  )
}

export default MoviePage