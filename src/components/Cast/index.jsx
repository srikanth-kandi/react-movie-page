import { useEffect, useState } from "react";
import { LoadingSpinner, CastCard, NotFound } from '..';
import './Cast.css'

function Cast({ movieId }) {
    const castDetailsApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
    const [castDetails, setCastDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCastDetails = async () => {
            try {
                const response = await fetch(castDetailsApiUrl);
                const data = await response.json();
                const filteredCast = data.cast.filter(cast => cast.profile_path !== null && cast.hasOwnProperty('character') && cast.character !== (null || "") );
                setCastDetails(filteredCast);
            } catch (error) {
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCastDetails();
    }, [movieId, castDetailsApiUrl, setHasError, setCastDetails, setLoading])

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (hasError) {
        return <NotFound fromSearch={false} msg={"cast"} />
    }

    return (
        <>
            {castDetails.length !== 0 &&
                <div className="cast-container">
                    <h1 className="cast-heading">Cast</h1>
                    <ul className="cast-list">
                        {castDetails.map(cast => <CastCard key={cast.id} details={cast} />)}
                    </ul>
                </div >
            }
        </>
    )
}

export default Cast
