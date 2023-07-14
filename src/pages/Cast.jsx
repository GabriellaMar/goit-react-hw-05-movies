import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom"
import { API_KEY } from "./Home";
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner'
import Notiflix from 'notiflix';
import { StyledCastList } from "./Cast.styled";
import { StyledCastTittle } from "./Cast.styled"

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId, credits } = useParams();
  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
          },
        });
        console.log(response.data.cast);
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId, credits]);

  return (
    <StyledCastList>
      {error !== null && (
        <p>
          Oh, something happened! Please, try again later. Error: {error}
        </p>
      )}

      {isLoading && (
        <RotatingLines
          strokeColor="gray"
          strokeWidth={5}
          animationDuration={0.75}
          width={96}
          visible={true}
        />
      )}

      {cast.length > 0 && cast.map((actor) => (
        <li className="castItem" key={actor.id}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
            />
          ) : (
            <div className="noImageContainer">No Image Available</div>
          )}
          <StyledCastTittle>{actor.original_name}</StyledCastTittle>
          <p>{actor.character}</p>
        </li>
      ))}
    </StyledCastList>
  )
}

export default Cast;