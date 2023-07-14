import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom"
import axios from 'axios';
import Notiflix from 'notiflix';
import { useRef, Suspense, lazy, } from "react";
import { API_KEY } from "./Home";
import { useEffect } from "react";
import { useState } from "react";
import { StyledContainer, StyledLinkList, StyledSubtittle } from "./MovieDetails.styled";
import { StyledImg } from "./MovieDetails.styled";
// import Cast from "./Cast";
// import Reviews from "./Reviews";
import arrowLeftIcon from '../img/arrow-left.png';
import { RotatingLines } from "react-loader-spinner";

const  Cast = lazy(() => import("./Cast"));
const  Reviews = lazy(() => import("./Reviews"))


const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovieDetails(response.data);
        console.log(response.data);
      }  catch (error) {
        setError(error.message);
            Notiflix.Notify.failure(error.message);
          }finally {
            setIsLoading(false);
          }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <StyledContainer>
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

      <Link to={backLinkHref.current} className="goBackLink" >
        <img className="goBackImg" src={arrowLeftIcon} alt="Arrow Left" />  Go back</Link>

      {movieDetails !== null && (
        <div className="movieWpapper">
          <StyledImg src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.original_title} />
          <div className="movieDetailsWpapper">
            <h1>{movieDetails.original_title}</h1>
            <StyledSubtittle>Overview</StyledSubtittle>
            <p>{movieDetails.overview}</p>
            <StyledSubtittle>Genres</StyledSubtittle>
            <p>{movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
          <p className="info-tittle">Additional information</p>
          <StyledLinkList>
            <li>
              <NavLink className="NavLink" to="cast">CAST</NavLink>
            </li>
            <li><NavLink className="NavLink" to="reviews">REVIEWS</NavLink></li>
          </StyledLinkList>
          <Suspense
           fallback={
           <RotatingLines
            strokeColor="gray"
            strokeWidth={5}
            animationDuration={0.75}
            width={96}
            visible={true}
            />
          }
          >
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
          </Suspense>
        </div>
      )}
    </StyledContainer>
  )
};

export default MovieDetails