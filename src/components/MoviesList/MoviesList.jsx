import { Link, useLocation } from "react-router-dom";
import { StyledMoviesList } from './MoviesList.styled'

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <StyledMoviesList>
      {movies.length > 0 &&
        movies.map((movie) => (
          movie.original_title ? (
            <li key={movie.id}>
              <Link
                state={{ from: location }}
                className="movieListItem"
                to={`/movies/${movie.id}`}>
                {movie.original_title}
              </Link>
            </li>
          ) : null
        ))}

    </StyledMoviesList>
  );
};
