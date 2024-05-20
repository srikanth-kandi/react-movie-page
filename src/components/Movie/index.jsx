import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import MovieBackdrop from '../MovieBackdrop'
import NotFound from '../NotFound';
import './Movie.css';

function Movie() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`

    useEffect(() => {
        fetchMovieDetails();
    }, [movieId])

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(movieDetailsApiUrl);
            const data = await response.json();
            document.title = `${data.title} - Sri Movie Page`
            if (data.status_code) {
                setHasError(true);
            } else {
                setMovieDetails(data);
                setHasError(false);
            }
        } catch (error) {
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (hasError) {
        document.title = "Movie Not Found - Sri Movie Page"
        return <NotFound fromSearch={false} />
    }
    
    return (
        <div className="movie">
            <MovieBackdrop details={movieDetails} />
        </div>
    );
}

export default Movie
