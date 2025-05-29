import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CoursePage = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // const [isEnrolled, setIsEnrolled] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        if (!Array.isArray(data)) {
          throw new Error("Courses response is not an array");
        }
        if (user.role === "Instructor") {
          const filtered = data.filter((c) => c.instructorId === user.userId);
          setCourses(filtered);
        } else {
          // setCourses(data);
          // Fetch enrollments for the student
          const enrollmentRes = await axios.get(`${API_URL}/EnrollmentModels`);
          const userEnrollments = Array.isArray(enrollmentRes.data)
            ? enrollmentRes.data.filter((e) => e.userId === user.userId)
            : [];

          const enrolledIds = userEnrollments.map(
            (enrollment) => enrollment.courseId
          );
          setEnrolledCourseIds(enrolledIds);

          const enrolled = data.filter((c) => enrolledIds.includes(c.courseId));
          const available = data.filter(
            (c) => !enrolledIds.includes(c.courseId)
          );

          setEnrolledCourses(enrolled);
          setAvailableCourses(available);
        }
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };
    fetchCourses();
  }, [user]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`${API_URL}/EnrollmentModels`, {
        userId: user.userId,
        courseId: courseId,
        // enrolledOn: new Date().toISOString(),
      });
      // Move course from available to enrolled
      const enrolledCourse = availableCourses.find(
        (c) => c.courseId === courseId
      );
      setEnrolledCourses((prev) => [...prev, enrolledCourse]);
      setAvailableCourses((prev) =>
        prev.filter((c) => c.courseId !== courseId)
      );
      setEnrolledCourseIds((prev) => [...prev, courseId]);
      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${API_URL}/CourseModels/${courseId}`);
        alert("Course deleted successfully");
        setAvailableCourses((prev) =>
          prev.filter((c) => c.courseId !== courseId)
        );
      } catch (err) {
        console.error("Failed to delete course:", err);
        alert("Failed to delete course");
      }
    }
  };

  const renderCourseCard = (course) => (
    <div className="col-md-6 col-lg-4 mb-4" key={course.courseId}>
      <div className="card h-100 shadow-lg border-0 rounded-4">
        <div className="card-body d-flex flex-column">
          <h5
            className="card-title fw-bold text-primary text-center mb-2"
            style={{ fontSize: "1.5rem" }}
          >
            {course.title}
          </h5>
          {/* <p className="card-text text-muted">{course.description}</p> */}

          {/* Show instructor name only for students */}
          {user.role === "Student" && (
            <p
              className="text-dark mb-2"
              style={{ fontSize: "0.9rem", fontWeight: "600" }}
            >
              <i className="bi bi-person-circle me-1"></i>
              Instructor: {course.instructorName || "N/A"}
            </p>
          )}

          {/* View / Edit / Enroll Buttons */}
          <div className="mt-auto d-flex flex-row flex-wrap justify-content-center gap-2">
            <Link
              to={`/course/${course.courseId}`}
              className="btn btn-outline-primary btn-sm rounded-pill"
            >
              <i className="bi bi-eye me-1"></i> View Course
            </Link>

            {user.role === "Instructor" && (
              <>
                <Link
                  to={`/course/edit/${course.courseId}`}
                  className="btn btn-outline-warning btn-sm rounded-pill"
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => handleDeleteCourse(course.courseId)}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
              </>
            )}

            {user.role === "Student" &&
              (enrolledCourseIds.includes(course.courseId) ? (
                // <button className="btn btn-success btn-sm rounded-pill" disabled>
                //   <i className="bi bi-check-circle me-1"></i> Enrolled
                // </button>
                <div></div>
              ) : (
                <button
                  className="btn btn-outline-success btn-sm rounded-pill"
                  onClick={() => handleEnroll(course.courseId)}
                >
                  <i className="bi bi-plus-circle me-1"></i> Enroll
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );  

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2>
          {user.role === "Instructor" ? "Courses you created " : ""}
        </h2>
        {user.role === "Instructor" && (
          <button
            className="btn btn-success rounded-pill"
            onClick={() => navigate("/course/create")}
          >
            + Create New Course
          </button>
        )}
      </div>

      {/* Student's enrolled courses */}
      {user.role === "Student" && enrolledCourses.length > 0 && (
        <>
          <h3>My Courses</h3>
          <div className="row">{enrolledCourses.map(renderCourseCard)}</div>
        </>
      )}

      {/* Available courses (not enrolled) */}
      <h3>{user.role === "Instructor" ? "" : "Available Courses"}</h3>
      {user.role === "Instructor" ? (
        courses.length === 0 ? (
          <p className="text-muted">No courses found.</p>
        ) : (
          <div className="row">{courses.map(renderCourseCard)}</div>
        )
      ) : availableCourses.length === 0 ? (
        <p className="text-muted">No courses found.</p>
      ) : (
        <div className="row">{availableCourses.map(renderCourseCard)}</div>
      )}

      <button
        className="btn btn-secondary mt-3 rounded-pill"
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

export default CoursePage;
