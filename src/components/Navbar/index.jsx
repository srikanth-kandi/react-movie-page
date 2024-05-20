import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1><Link to="/">Sri - Movie Page</Link></h1>
        <ul className="nav-items-ul">
          <li>
            <Link to="/">Popular</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming</Link>
          </li>
          <li className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Movie Name - doraemon"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
