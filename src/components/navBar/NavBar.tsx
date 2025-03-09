import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/characters"
        className={`navbar-button characters ${
          location.pathname === "/characters" ? "active" : ""
        }`}
      >
        <span className="linkStyle">Characters</span>
      </Link>
      <Link
        to="/episodes"
        className={`navbar-button episodes ${
          location.pathname === "/episodes" ? "active" : ""
        }`}
      >
        <span className="linkStyle">Episodes</span>
      </Link>
      <Link
        to="/locations"
        className={`navbar-button locations ${
          location.pathname === "/locations" ? "active" : ""
        }`}
      >
        <span className="linkStyle">Locations</span>
      </Link>
    </nav>
  );
};

export default NavBar;
