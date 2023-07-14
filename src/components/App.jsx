import { RotatingLines } from 'react-loader-spinner'
import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from "react-router-dom";
// import  Homepage  from "pages/Home";
// import  MovieDetails  from "pages/MovieDetails";
// import  Movies  from "pages/Movies";
import { StyledHeader, StyledContainer } from "./App.styled";

const HomePage = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import("pages/MovieDetails"));
const Movies = lazy(() => import("pages/Movies"));



export const App = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <ul className="headerList">
          <li>
            <NavLink className="NavLink" to="/"> Home</NavLink>
          </li>
          <li> <NavLink className="NavLink" to="/movies">Movies</NavLink></li>
        </ul>
      </StyledHeader>
      <main>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />} />
          </Routes>
        </Suspense>
      </main>
    </StyledContainer>

  );
};
