import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // keeping your current CSS file as is

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser")); // ✅ fixed key name

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // ✅ clears correct user data
    navigate("/"); // ✅ goes back to login page
  };

  return (
    <header className="navbar">
      <div>
        <Link
          to={user ? "/home" : "/"}
          className="brand"
          style={{ textDecoration: "none" }}
        >
          SkillCert Locker
        </Link>
      </div>

      <nav className="nav-links">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/certificates">My Certificates</Link>
            <Link to="/add">Add</Link>
            <Link to="/profile">Profile</Link>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
