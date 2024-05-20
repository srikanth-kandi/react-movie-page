import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import MovieCard from '../MovieCard';
import NotFound from '../NotFound';

const searchMovieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US`;

function SearchedMovies() {
  const { searchTerm } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies(searchTerm);
    document.title = `${searchTerm} - Sri Movie Page`
  }, [searchTerm]);

  const fetchMovies = async (searchTerm) => {
    const response = await fetch(`${searchMovieApiUrl}&query=${searchTerm}&page=1`);
    const data = await response.json();
    setMovies(data.results);
    setLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (movies.length === 0) {
    document.title = "Search Not Found - Sri Movie Page"
    return <NotFound fromSearch={true} />
  }

  return (
    <div>
      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default SearchedMovies;
