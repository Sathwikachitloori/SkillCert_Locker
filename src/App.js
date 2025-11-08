import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Certificates from "./pages/Certificates";
import AddCertificate from "./pages/AddCertificate";
import Profile from "./pages/Profile";

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="app">
      {/* ✅ Show Navbar only when user is logged in */}
      {loggedInUser && <Navbar />}

      <main className="container">
        <Routes>
          {/* LOGIN / REGISTER */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/certificates"
            element={
              <RequireAuth>
                <Certificates />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddCertificate />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          {/* CATCH-ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        © 2025 SkillCert Locker — Where creativity meets code.
      </footer>
    </div>
  );
}

export default App;
