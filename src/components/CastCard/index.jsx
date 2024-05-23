import './CastCard.css'

function CastCard({ details })
{
    return (
        <li className="cast-card-container">
            <img 
                src={`https://image.tmdb.org/t/p/original${details.profile_path}`}
                alt={details.name}
                className="cast-card-image"
            />
            <p className="cast-card-name">{details.name}</p>
            <p className="cast-card-character">Character: {details.character}</p>
        </li>
    )
}

export default CastCard
