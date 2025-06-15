import { VITE_TMDB_API_KEY } from "./config";

const API_KEY = VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

export const fetchMovieId = async (id : string) => {
    
    if (!id) {
        throw new Error('Movie ID is required');
    }

  try {
    const endpoint = `https://api.themoviedb.org/3/movie/${id}`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error('Failed to get data response');
    }
    
    return data;
  } catch (error) {
    console.log(error);
  }
}