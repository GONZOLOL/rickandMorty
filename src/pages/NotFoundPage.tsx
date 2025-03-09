import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="goBackButton">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
