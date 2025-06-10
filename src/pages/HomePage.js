import React from 'react';
// import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
    {/* Hero Section */}
    <div className="mb-5">
      <h1 className="display-4 fw-bold text-primary mb-3">
        Welcome to EduSync LMS
      </h1>
      <p className="lead text-secondary mb-4">
        A modern platform for seamless learning, teaching, and course
        management. EduSync is your smart solution for learning management.
        Whether you're a student or an instructor, EduSync empowers you with
        tools to learn, teach, manage courses, and collaborate effortlessly.
      </p>
    </div>

    {/* Features Section */}
    <div className="container mt-1">
      <h2 className="mb-4">Why Choose EduSync?</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3 text-primary fs-1">
                <i className="bi bi-mortarboard"></i>
              </div>
              <h5 className="card-title">Interactive Learning</h5>
              <p className="card-text">
                Access quizzes, assessments, and real-time feedback to enhance
                your learning experience.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3 text-success fs-1">
                <i className="bi bi-people"></i>
              </div>
              <h5 className="card-title">For Students & Instructors</h5>
              <p className="card-text">
                EduSync supports both students and instructors with tailored
                dashboards and tools.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3 text-warning fs-1">
                <i className="bi bi-speedometer2"></i>
              </div>
              <h5 className="card-title">Progress Tracking</h5>
              <p className="card-text">
                Easily monitor your academic progress and performance across
                courses and assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
