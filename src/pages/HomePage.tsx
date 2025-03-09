import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Link to="/characters" className="home-page-button characters">
        <span className="linkStyle">Characters</span>
      </Link>
      <Link to="/episodes" className="home-page-button episodes">
        <span className="linkStyle">Episodes</span>
      </Link>
      <Link to="/locations" className="home-page-button locations">
        <span className="linkStyle">Locations</span>
      </Link>
    </div>
  );
};

export default HomePage;
