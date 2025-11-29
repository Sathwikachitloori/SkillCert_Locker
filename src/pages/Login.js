import React, { useState } from "react";
import "../components/Auth.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // -------------------------
    // ADDED VALIDATIONS
    // -------------------------

  

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (foundUser) {
      alert("✅ Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/home");
    } else {
      alert("❌ Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-auth">
            Login
          </button>
        </form>

        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;