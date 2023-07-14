
import { RotatingLines } from 'react-loader-spinner'
import Notiflix from 'notiflix';
import axios from 'axios';
import { useEffect, useState } from "react"
import { MoviesList } from "components/MoviesList/MoviesList";
// import { Link } from "react-router-dom";
// const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day?';
export const API_KEY = '5788acd6bec4b8c2fc2e238d02649a74';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
          params: {
            api_key: API_KEY,
          },
        });
        setMovies(response.data.results);
        console.log(movies)
        // console.log(response.data.results); 
      } catch (error) {
        setError(error.message);
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, [movies]);

  return (
    <div>
      <h1>Trending today</h1>
      {error !== null && (
        <p>
          Oh, something happened! Please, try again later. Error: {error}
        </p>)}

      {isLoading && (
        <RotatingLines
          strokeColor="gray"
          strokeWidth={5}
          animationDuration={0.75}
          width={96}
          visible={true}
        />
      )}
      <MoviesList movies={movies} />
    </div>
  )
}

export default HomePage;