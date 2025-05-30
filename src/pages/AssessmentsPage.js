import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AssessmentsPage = () => {
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isStudent = user?.role === "Student";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isStudent) {
          const [courseRes, assessmentRes, enrollRes] = await Promise.all([
            axios.get(`${API_URL}/CourseModels`),
            axios.get(`${API_URL}/AssessmentModels`),
            axios.get(`${API_URL}/EnrollmentModels/student/${user.userId}`),
          ]);

          setCourses(courseRes.data);
          setAssessments(assessmentRes.data);
          setEnrolledCourses(enrollRes.data.map((e) => e.courseId));
        } else {
          // INSTRUCTOR: Fetch only their courses and related assessments
          const [courseRes, assessmentRes] = await Promise.all([
            axios.get(`${API_URL}/CourseModels/instructor/${user.userId}`),
            axios.get(`${API_URL}/AssessmentModels/instructor/${user.userId}`),
          ]);

          setCourses(courseRes.data);
          setAssessments(assessmentRes.data);
          // Fetch all courses
          // const courseRes = await axios.get(`${API_URL}/CourseModels`);
          // setCourses(courseRes.data);

          // // Fetch all assessments
          // const assessmentRes = await axios.get(`${API_URL}/AssessmentModels`);
          // setAssessments(assessmentRes.data);
          // if (isStudent) {
          //   const enrollRes = await axios.get(
          //     `${API_URL}/EnrollmentModels/student/${user.userId}`
          //   );
          //   setEnrolledCourses(enrollRes.data.map((e) => e.courseId));
          // }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isStudent, user.userId]);

  const handleDeleteAssessment = async (assessmentId) => {
    if (window.confirm("Delete this assessment?")) {
      try {
        await axios.delete(`${API_URL}/AssessmentModels/${assessmentId}`);
        alert("Assessment deleted");
        setAssessments((prev) =>
          prev.filter((a) => a.assessmentId !== assessmentId)
        );
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Could not delete assessment");
      }
    }
  };

  // Filter for student: only enrolled course assessments
  const filteredCourses = isStudent
    ? courses.filter((course) => enrolledCourses.includes(course.courseId))
    : courses;

  // Group assessments by courseId for easy display
  const assessmentsByCourse = filteredCourses.reduce((acc, course) => {
    acc[course.courseId] = {
      courseTitle: course.title,
      assessments: [],
    };
    return acc;
  }, {});

  assessments.forEach((assessment) => {
    const isVisible =
      !isStudent || enrolledCourses.includes(assessment.courseId);

    if (isVisible) {
      if (assessmentsByCourse[assessment.courseId]) {
        assessmentsByCourse[assessment.courseId].assessments.push(assessment);
      } else {
        // In case assessment has courseId not found in courses
        assessmentsByCourse[assessment.courseId] = {
          courseTitle: "Unknown Course",
          assessments: [assessment],
        };
      }
    }
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {isStudent
            ? "Available assessments of Enrolled Courses:"
            : "All Assessments by Courses"}
        </h2>
        {!isStudent && (
          <button
            className="btn btn-success rounded-pill"
            onClick={() => navigate("/assessments/create")}
          >
            + Create New Assessment
          </button>
        )}
      </div>

      {Object.keys(assessmentsByCourse).length === 0 && (
        <p>No assessments available.</p>
      )}

      {Object.entries(assessmentsByCourse).map(
        ([courseId, { courseTitle, assessments }]) => (
          <div key={courseId} className="mb-4">
            <button
              className="btn w-100 text-start fw-semibold rounded-pill shadow-sm"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                transition: "color 0.3s",
              }}
              onClick={() =>
                setExpandedCourse((prev) =>
                  prev === courseId ? null : courseId
                )
              }
            >
              {courseTitle}
              <span className="float-end">
                {expandedCourse === courseId ? "▼" : "▶"}
              </span>
            </button>

            {expandedCourse === courseId && (
              <div className="mt-3 ms-3">
                {assessments.length === 0 ? (
                  <p className="text-muted">No assessments for this course.</p>
                ) : (
                  <div className="row g-3">
                    {assessments.map((assessment) => (
                      <div
                        key={assessment.assessmentId}
                        className="col-sm-6 col-md-4 col-lg-3"
                      >
                        <div
                          className="card border-0 shadow-sm h-100"
                          style={{ borderRadius: "1rem" }}
                        >
                          <div className="card-body p-3 d-flex flex-column justify-content-between">
                            <h6
                              className="fw-bold text-primary mb-2"
                              style={{ fontSize: "1.3rem" }}
                            >
                              {/* {assessment.title.toUpperCase()} */}
                              {assessment.title}
                            </h6>
                            <div className="mt-auto">
                              {!isStudent ? (
                                <div className="d-flex justify-content-between w-100 mt-2">
                                  <Link
                                    to={`/assessments/view/${assessment.assessmentId}`}
                                    className="btn btn-sm btn-outline-primary flex-fill mx-1 rounded-pill"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    View
                                  </Link>
                                  <Link
                                    to={`/assessments/edit/${assessment.assessmentId}`}
                                    className="btn btn-sm btn-outline-warning flex-fill mx-1 rounded-pill"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger flex-fill mx-1 rounded-pill"
                                    style={{ fontSize: "0.8rem" }}
                                    onClick={() =>
                                      handleDeleteAssessment(
                                        assessment.assessmentId
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ) : (
                                <Link
                                  to={`/assessments/attempt/${assessment.assessmentId}`}
                                  className="btn btn-sm btn-outline-success rounded-pill w-100"
                                >
                                  Attempt
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      )}
      <button
        className="btn btn-outline-secondary mt-3 rounded-pill"
        onClick={() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user?.role === "Instructor") {
            navigate("/instructor-dashboard");
          } else {
            navigate("/student-dashboard");
          }
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default AssessmentsPage;
