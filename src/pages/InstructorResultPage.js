import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const InstructorResultPage = () => {
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Fetch instructor's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/CourseModels`);
        const instructorCourses = res.data.filter(
          (course) => course.instructorId === user.userId
        );
        setCourses(instructorCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    if (user?.role === "Instructor") {
      fetchCourses();
    }
  }, [user.userId]);

  // Fetch assessments for selected course
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get(`${API_URL}/AssessmentModels`, {
          params: { instructorId: user.userId },
        });
        let filtered;
        if (selectedCourseId === "all") {
          filtered = res.data; // all assessments from all courses
        } else {
          filtered = res.data.filter((a) => a.courseId === selectedCourseId);
        }
        setAssessments(filtered);
        setSelectedAssessmentId("");
      } catch (err) {
        console.error("Failed to fetch assessments:", err);
      }
    };

    if (selectedCourseId) {
      fetchAssessments();
    } else {
      setAssessments([]);
      setSelectedAssessmentId("");
    }
  }, [selectedCourseId]);

  // Fetch results for selected assessment
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${API_URL}/ResultModels`, {
          params: { instructorId: user.userId },
        });
        let filtered;
        if (selectedAssessmentId === "all") {
          // If "all assessments" selected
          if (selectedCourseId === "all") {
            // Show all results across all courses/assessments
            filtered = res.data;
          } else {
            // Filter results only for assessments that belong to selected course
            // We already have assessments for selectedCourseId in `assessments` state
            const assessmentIdsForCourse = assessments.map(
              (a) => a.assessmentId
            );
            filtered = res.data.filter((r) =>
              assessmentIdsForCourse.includes(r.assessmentId)
            );
          }
        } else {
          // Specific assessment selected
          filtered = res.data.filter(
            (r) => r.assessmentId === selectedAssessmentId
          );
        }

        setResults(filtered);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    };

    if (selectedAssessmentId) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [selectedAssessmentId, selectedCourseId, assessments]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Student Assessment Results</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select Course:</label>
          <select
            className="form-control"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>Select Assessment:</label>
          <select
            className="form-control"
            value={selectedAssessmentId}
            onChange={(e) => setSelectedAssessmentId(e.target.value)}
            disabled={!selectedCourseId}
          >
            <option value="">-- Select Assessment --</option>
            <option value="all">All Assessments</option>
            {assessments.map((a) => (
              <option key={a.assessmentId} value={a.assessmentId}>
                {a.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-4">
          <h5>Results</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                {selectedCourseId === "all" && <th>Course</th>}
                {selectedAssessmentId === "all" && <th>Assessment</th>}
                <th>Student</th>
                <th>Score</th>
                <th>Max Score</th>
                <th>Percentage</th>
                <th>Attempt Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const courseTitle =
                selectedCourseId === "all" && r.assessment?.courseId
                  ? (courses.find((c) => c.courseId === r.assessment.courseId)?.title || "N/A")
                  : null;
                
                return (
                <tr key={r.resultId}>
                  {selectedCourseId === "all" && (
                    <td>{courseTitle}</td>
                  )}
                  {selectedAssessmentId === "all" && (
                    <td>{r.assessment?.title || "N/A"}</td>
                  )}

                  <td>{r.user?.name || "Unknown"}</td>
                  <td>{r.score}</td>
                  <td>{r.assessment?.maxScore}</td>
                  <td>
                    {r.assessment?.maxScore
                      ? ((r.score / r.assessment.maxScore) * 100).toFixed(2)
                      : "N/A"}
                    %
                  </td>
                  <td>{new Date(r.attemptDate).toLocaleString()}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : selectedAssessmentId ? (
        <p>No results found for this assessment.</p>
      ) : null}

      <button
        className="btn btn-secondary mt-4"
        onClick={() =>
          navigate(
            user.role === "Instructor"
              ? "/instructor-dashboard"
              : "/student-dashboard"
          )
        }
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default InstructorResultPage;
