import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" aria-label="Go to home page">
            🎫 Ticket Manager Pro
          </Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              className={location.pathname.includes("/auth/login") ? "active" : ""}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/auth/signup"
              className={location.pathname.includes("/auth/signup") ? "active" : ""}
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
