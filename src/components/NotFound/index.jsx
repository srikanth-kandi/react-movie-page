import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './NotFound.css';

export default function NotFound({ fromSearch, msg }) {
    useEffect(() => {
        document.title = "404 Not Found - Sri Movie Page"
    });

    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <br />
            {fromSearch
                ? <p>Sorry, please try another search text.</p>
                : (
                    msg === "cast" ? <p>Sorry, the movie cast details you are looking for does not exist.</p>
                    : <p>Sorry, the movie you are looking for does not exist.</p>
                )
            }
        </div>
    )
}

NotFound.propTypes = {
    fromSearch: PropTypes.bool.isRequired
};
