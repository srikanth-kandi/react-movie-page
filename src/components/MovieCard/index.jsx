import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
    return (
        <li className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <p className="rating">Rating - {Number(movie.vote_average).toFixed(1)}</p>
                </div>
            </Link>
        </li>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
};
