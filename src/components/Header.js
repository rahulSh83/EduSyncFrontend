import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false); // Force dropdown closed on route change
  }, [location]);

  const goToDashboard = () => {
    if (user?.role === "Instructor") {
      navigate("/instructor-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container d-flex justify-content-between align-items-center w-100">
        {/* Left placeholder (empty for spacing) */}
        <div style={{ width: "100px" }}></div>

        {/* Center logo */}
        <span className="navbar-brand mx-auto fs-3">EduSync LMS</span>

        {/* Right menu */}
        {user && (
          <div className="position-relative">
            <div className="d-flex align-items-center ">
              <span className="text-white me-3 fs-5">{user.name}</span>

              {/* Hamburger Icon */}
              <button
                className="btn btn-outline-light rounded-pill"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                className="position-absolute bg-white shadow border rounded-3 "
                style={{
                  top: "100%",
                  right: 0,
                  marginTop: "10px",
                  zIndex: 1000,
                  minWidth: "150px",
                }}
              >
                <div className="d-flex flex-column">
                  <button
                    className="dropdown-item py-2 px-3 text-start"
                    onClick={goToDashboard}
                  >
                    Dashboard
                  </button>
                  <Link
                    to="/course"
                    className="dropdown-item py-2 px-3 text-start"
                  >
                    Courses
                  </Link>
                  <Link
                    to="/assessments"
                    className="dropdown-item py-2 px-3 text-start"
                  >
                    Assessments
                  </Link>
                  <Link to="/" className="dropdown-item py-2 px-3 text-start">
                    Home
                  </Link>
                  <hr className="my-1" />
                  <button
                    className="dropdown-item py-2 px-3 text-start text-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {!user && (
          <div className="d-flex align-items-center">
            <Link
              className="btn btn-outline-light me-2 rounded-pill"
              to="/register"
            >
              Register
            </Link>
            <Link className="btn btn-outline-light rounded-pill" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
