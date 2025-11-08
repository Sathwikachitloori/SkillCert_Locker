import React, { useState } from "react";
import "../components/Auth.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const professions = [
    "Software Developer / Cloud Engineer",
    "Cybersecurity Analyst",
    "Data Scientist / Data Analyst",
    "Project Manager / Scrum Master",
    "Digital Marketing Specialist",
    "Healthcare Technician / Medical Assistant",
    "Electrician / HVAC Technician",
    "Financial Analyst / Accountant",
    "AI & Machine Learning Engineer",
    "Human Resources Professional",
    "Teacher / Educational Trainer",
    "Web Developer / UI-UX Designer",
    "Network Engineer / IT Support Specialist",
    "Sustainability or Environmental Engineer",
    "Cloud Architect / DevOps Engineer",
  ];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate email
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      setMessage("⚠️ Email already registered! Try logging in.");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // optional auto-login

    setMessage("✅ Registration successful! Redirecting...");
    setTimeout(() => navigate("/home"), 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <select
            name="profession"
            value={user.profession}
            onChange={handleChange}
            required
          >
            <option value="">Select Your Profession</option>
            {professions.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-auth">
            Register
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-3 font-medium ${
              message.startsWith("⚠️") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
