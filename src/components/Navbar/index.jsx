import { useState } from "react";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchOpen(false); // Close mobile search after submit
      setMenuOpen(false); // Close menu on mobile after search
    }
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false); // Close menu when navigation link is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setSearchOpen(false); // Close search when opening menu
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setMenuOpen(false); // Close menu when opening search
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="hamburger-btn" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-icon">☰</span>
          </button>
          <h1><Link to="/" className="home-link">Sri - Movie Page</Link></h1>
        </div>

        <button 
          className="mobile-search-icon" 
          onClick={toggleSearch}
          aria-label="Toggle search"
          aria-expanded={searchOpen}
        >
          🔍
        </button>

        <ul className={`nav-items-ul ${menuOpen ? 'menu-open' : ''}`}>
          <li>
            <NavLink to="/" onClick={handleNavLinkClick}>Popular</NavLink>
          </li>
          <li>
            <NavLink to="/top-rated" onClick={handleNavLinkClick}>Top Rated</NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" onClick={handleNavLinkClick}>Upcoming</NavLink>
          </li>
          <li className="search-container desktop-search">
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

        {/* Mobile search form */}
        <div className={`mobile-search-container ${searchOpen ? 'search-open' : ''}`}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search movies..."
              className="search mobile-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
