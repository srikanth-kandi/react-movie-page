import PropTypes from 'prop-types';
import './MovieBackdrop.css'

function MovieBackdrop({ details }) {
    const genres = details.genres.map(genre => genre.name).join(', ');
    const releaseDate = new Date(details.release_date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${days[releaseDate.getDay()]}, ${months[releaseDate.getMonth()]} ${releaseDate.getDate()} ${releaseDate.getFullYear()}`;
    const runtimeMinWidth = details.runtime >= 100 ? '92px' : '82px';

    return (
        <div
          className="backdrop-container"
          style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 100%),
                                    url(https://image.tmdb.org/t/p/original${details.backdrop_path})`}}
        >
            <div className="poster-container">
                <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={details.title}
                    className="movie-poster-movie-detail"
                />
                <div className="movie-info-movie-detail">
                    <h2 className="movie-title-movie-detail">{details.title}</h2>
                    <p className="rating">Rating - {Number(details.vote_average).toFixed(1)}</p>
                    <div className="runtime-genres">
                        <div className="runtime" style={{minWidth: runtimeMinWidth}}>{details.runtime} min</div>
                        <div className="genres">{genres}</div>
                    </div>
                    <p className="release-date">Release Date - {formattedDate}</p>
                </div>
            </div>
            <div className="overview-container">
                <h3 className="overview-heading">Overview</h3>
                <p className="overview-content">{details.overview}</p>
            </div>
        </div>
    )
}

MovieBackdrop.propTypes = {
    details: PropTypes.object.isRequired
};

export default MovieBackdrop
