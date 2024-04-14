import React from "react";
import { Link, Navigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      Page not NotFound
      <Link to={"/login"} className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};

export default NotFound;
