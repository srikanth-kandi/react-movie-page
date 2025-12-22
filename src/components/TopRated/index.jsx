import {useState, useEffect, useCallback, useRef} from "react";
import { LoadingSpinner, MovieCard } from "..";
import "./TopRated.css";

const topRatedMovieApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
}&language=en-US`;

export default function TopRated() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Local page variable to avoid state issues
  const page = useRef(1);

  useEffect(() => {
    document.title = "Top Rated Movies | Sri - Movie Page";
  }, []);

  // Function to load movies for a specific page
  const loadMovies = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(`${topRatedMovieApiUrl}&page=${page.current}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(data.results.length > 0);
        page.current += 1;
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, isLoading]);

  // Initial load on component mount
  useEffect(() => {
    if (initialLoad) {
      loadMovies();
      setInitialLoad(false);
    }
  }, [initialLoad, loadMovies]);

  // Load more movies when reaching the scroll threshold
  useEffect(() => {
    const handleScroll = () => {
      if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
          !isLoading &&
          hasMore
      ) {
        loadMovies();
      }
    };

    const debounceScroll = () => {
      clearTimeout(handleScroll.debounceTimeout);
      handleScroll.debounceTimeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [loadMovies, isLoading, hasMore]);

  return (
      <div className="top-rated">
        <ul className="top-rated-movies-list">
          {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
        {isLoading && <LoadingSpinner />}
      </div>
  );
}
