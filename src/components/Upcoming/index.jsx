import { useState, useEffect } from "react";
import { LoadingSpinner, MovieCard } from "..";
import "./Upcoming.css";

const upcomingMovieApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&language=en-US`;

export default function Upcoming() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "Upcoming Movies | Sri - Movie Page";
    setLoading(true);
    fetch(`${upcomingMovieApiUrl}&page=1`)
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
    <div className="upcoming">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="upcoming-movies-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
