import { API_OPTIONS } from "./app";

export const fetchGenre = async(id:number) => {
    try{
        const endpoint = `https://api.themoviedb.org/3/movie/${id}`;
        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok){
            throw new Error('Failed to get response');
        }

        const data = await response.json();
        if(data.Response === 'False'){
            throw new Error('Failed to get data response');
        }
        return data.genres;
    }catch(error){
        console.log(error);
    }
}