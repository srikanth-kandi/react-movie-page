import {useState, useEffect, useCallback, useRef} from "react";
import { LoadingSpinner, MovieCard } from "..";
import "./Home.css";

const popularMovieApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
}&language=en-US`;

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true); // Flag for initial load

  // Local page variable to avoid state issues
  const page = useRef(1);

  // Function to load movies for a specific page
  const loadMovies = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(`${popularMovieApiUrl}&page=${page.current}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(data.results.length > 0); // Check if there are more movies
        page.current += 1; // Increment local page number
      } else {
        setHasMore(false); // No more data available
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
      <div className="home">
        <ul className="home-movies-list">
          {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
        {isLoading && <LoadingSpinner />} {/* Shows loader while fetching */}
      </div>
  );
}
