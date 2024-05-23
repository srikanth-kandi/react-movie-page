import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import MovieCard from "../MovieCard";
import "./Home.css";

const popularMovieApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&language=en-US`;

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "Popular Movies | Sri - Movie Page";
    setLoading(true);
    fetch(`${popularMovieApiUrl}&page=1`)
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
    <div className="home">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="home-movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
