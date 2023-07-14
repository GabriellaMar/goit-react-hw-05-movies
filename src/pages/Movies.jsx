import { StyledInput, StyledSearchBtn } from "./Movies.styled";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { RotatingLines } from 'react-loader-spinner'
import Notiflix from 'notiflix';
import { API_KEY } from "./Home";
import { MoviesList } from "components/MoviesList/MoviesList";
// import { MoviesList } from "../components/MoviesList/MoviesList";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasResults, setHasResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovie = searchParams.get("query");
  const location = useLocation();



  useEffect(() => {

    if (!searchMovie) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              include_adult: false,
              language: "en-US",
              page: 1,
              query: searchMovie,
              api_key: API_KEY,
            },
          }
        );
        setMovies(response.data.results);
        setHasResults(response.data.results.length > 0);
        // console.log(response.data.results)
      } catch (error) {
        setError(error.message)
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchValue = e.target.elements.searchMovie.value;
    // console.log(searchValue)
    setSearchParams({ query: searchValue });



  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="searchMovie"
          placeholder="Enter movie"
          required
        />
        <StyledSearchBtn type="submit">Search</StyledSearchBtn>
      </form>

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

      {searchMovie && !hasResults && (
        <p>Oops! No movie found with this title. Try again.</p>
      )}

      {hasResults && <MoviesList movies={movies} location={location} />}
    </>
  );
}

export default Movies