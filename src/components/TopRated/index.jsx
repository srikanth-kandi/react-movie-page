import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import MovieCard from "../MovieCard";
import "./TopRated.css";

const topRatedMovieApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&language=en-US`;

export default function TopRated() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "Top Rated Movies | Sri - Movie Page";
    setLoading(true);
    fetch(`${topRatedMovieApiUrl}&page=1`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="top-rated">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
