import axios from "axios";
import { RotatingLines } from 'react-loader-spinner'
import Notiflix from 'notiflix';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "./Home";
import { StyledReviewList, StyledNoReviews } from "./Reviews.styled";


const Reviews = () => {
  const [movieReviews, setmovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId, reviews } = useParams();
  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
          },
        });
        console.log(response.data.results);

        setmovieReviews(response.data.results);
      } catch (error) {
        setError(error.message);
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId, reviews])


  return (
    <>
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

      {movieReviews.length > 0 ? (
        <StyledReviewList>
          {movieReviews.map((review =>
            <li key={review.id}>
              <p className="author"> {review.author}</p>
              <p className="content">{review.content}</p>
            </li>
          ))}
        </StyledReviewList>
      ) : (<StyledNoReviews> We don't have any reviews about this movie</StyledNoReviews>
      )}
    </>
  );

}

export default Reviews;