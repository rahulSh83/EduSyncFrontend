import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [studentResults, setStudentResults] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "Instructor") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const courseRes = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/CourseModels`
        );
        const instructorCourses = courseRes.data.filter(
          (c) => c.instructorId === user.userId
        );
        setCourses(instructorCourses);

        const assessmentRes = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/AssessmentModels`
        );
        const instructorAssessments = assessmentRes.data.filter((a) =>
          instructorCourses.some((c) => c.courseId === a.courseId)
        );
        setAssessments(instructorAssessments);

        const resultRes = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/ResultModels`
        );
        const instructorResults = resultRes.data.filter((r) =>
          instructorAssessments.some((a) => a.assessmentId === r.assessmentId)
        );
        setStudentResults(instructorResults);
      } catch (error) {
        console.error("Error fetching instructor dashboard data:", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, {user?.name || "Instructor"} 👋</h2>
        <p className="text-muted">
          Manage your courses, assessments, and view student performance.
        </p>
      </div>

      {/* METRIC BLOCKS WITH HEADINGS, NUMBERS & ICONS */}
      <div className="row text-center mb-5">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
            <h1 className="display-2 fw-bold text-primary">{courses.length}</h1>
            <p className="mt-2 fw-bold fs-5 text-dark">📘 Courses Created</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
            <h1 className="display-2 fw-bold text-success">
              {assessments.length}
            </h1>
            <p className="mt-2 fw-bold fs-5 text-dark">
              📝 Assessments Created
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
            <h1 className="display-2 fw-bold text-danger">
              {studentResults.length}
            </h1>
            <p className="mt-2 fw-bold fs-5 text-dark">
              📊 Student Submissions
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
        <Link
          to="/course"
          className="btn btn-outline-dark px-4 py-2 rounded-pill fw-medium shadow-sm"
          style={{ fontSize: "1rem", minWidth: "200px" }}
        >
          📘 Manage Courses
        </Link>

        <Link
          to="/assessments"
          className="btn btn-outline-dark px-4 py-2 rounded-pill fw-medium shadow-sm"
          style={{ fontSize: "1rem", minWidth: "200px" }}
        >
          📝 Manage Assessments
        </Link>

        <Link
          to="/instructor-result"
          className="btn btn-outline-dark px-4 py-2 rounded-pill fw-medium shadow-sm"
          style={{ fontSize: "1rem", minWidth: "200px" }}
        >
          📊 View Results
        </Link>
      </div>
    </div>
  );
};

export default InstructorDashboard;

