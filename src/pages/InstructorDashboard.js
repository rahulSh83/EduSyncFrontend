// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./InstructorDashboard.css";

// const InstructorDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [courses, setCourses] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [studentResults, setStudentResults] = useState([]);

//   useEffect(() => {
//     if (!user || user.role !== "Instructor") {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const courseRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/CourseModels`
//         );
//         const instructorCourses = courseRes.data.filter(
//           (c) => c.instructorId === user.UserId
//         );
//         setCourses(instructorCourses);

//         const assessmentRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/AssessmentModels`
//         );
//         const instructorAssessments = assessmentRes.data.filter((a) =>
//           instructorCourses.some((c) => c.courseId === a.courseId)
//         );
//         setAssessments(instructorAssessments);

//         const resultRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/ResultModels`
//         );
//         const instructorResults = resultRes.data.filter((r) =>
//           instructorAssessments.some((a) => a.assessmentId === r.assessmentId)
//         );
//         setStudentResults(instructorResults);
//       } catch (error) {
//         console.error("Error fetching instructor dashboard data:", error);
//       }
//     };

//     fetchData();
//   }, [user, navigate]);

//   return (
//     <div className="container mt-4">
//       <div className="mb-4">
//         <h2 className="fw-semibold text-dark">
//           Welcome, {user?.Name || "Instructor"}
//         </h2>
//         <p className="text-muted">Instructor Dashboard Overview</p>
//       </div>

//       {/* METRICS */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <div className="metric-card bg-light shadow-sm">
//             <div className="metric-value">{courses.length}</div>
//             <div className="metric-label">Courses Created</div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="metric-card bg-light shadow-sm">
//             <div className="metric-value">{assessments.length}</div>
//             <div className="metric-label">Assessments</div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="metric-card bg-light shadow-sm">
//             <div className="metric-value">{studentResults.length}</div>
//             <div className="metric-label">Student Submissions</div>
//           </div>
//         </div>
//       </div>

//       {/* DETAIL PANELS */}
//       <div className="row">
//         {/* Courses */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0">
//             <h6 className="text-secondary mb-3">Courses</h6>
//             <ul className="scrollable-list text-dark">
//               {courses.length > 0 ? (
//                 courses.map((course) => (
//                   <li key={course.courseId}>{course.title}</li>
//                 ))
//               ) : (
//                 <li className="text-muted">No courses created yet.</li>
//               )}
//             </ul>
//             <Link to="/course" className="btn btn-sm btn-outline-dark mt-2">
//               Go to Courses
//             </Link>
//           </div>
//         </div>

//         {/* Assessments */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0">
//             <h6 className="text-secondary mb-3">Assessments</h6>
//             <ul className="scrollable-list text-dark">
//               {assessments.length > 0 ? (
//                 assessments.map((a) => <li key={a.assessmentId}>{a.title}</li>)
//               ) : (
//                 <li className="text-muted">No assessments found.</li>
//               )}
//             </ul>
//             <Link
//               to="/assessments"
//               className="btn btn-sm btn-outline-dark mt-2"
//             >
//               Go to Assessments
//             </Link>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0">
//             <h6 className="text-secondary mb-3">Student Performance</h6>
//             <ul className="scrollable-list text-dark">
//               {studentResults.length > 0 ? (
//                 studentResults.map((r) => (
//                   <li key={r.resultId}>
//                     {r.user?.name || "Student"} –{" "}
//                     {r.assessment?.title || "Assessment"}:{" "}
//                     <strong>{r.score}%</strong>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-muted">No results submitted yet.</li>
//               )}
//             </ul>
//             <Link to="/instructor-result" className="btn btn-sm btn-outline-dark mt-2">
//               View Results
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./InstructorDashboard.css";

// const InstructorDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [courses, setCourses] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [studentResults, setStudentResults] = useState([]);

//   useEffect(() => {
//     if (!user || user.role !== "Instructor") {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const courseRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/CourseModels`
//         );
//         const instructorCourses = courseRes.data.filter(
//           (c) => c.instructorId === user.userId
//         );
//         setCourses(instructorCourses);

//         const assessmentRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/AssessmentModels`
//         );
//         const instructorAssessments = assessmentRes.data.filter((a) =>
//           instructorCourses.some((c) => c.courseId === a.courseId)
//         );
//         setAssessments(instructorAssessments);

//         const resultRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/ResultModels`
//         );
//         const instructorResults = resultRes.data.filter((r) =>
//           instructorAssessments.some((a) => a.assessmentId === r.assessmentId)
//         );
//         setStudentResults(instructorResults);
//       } catch (error) {
//         console.error("Error fetching instructor dashboard data:", error);
//       }
//     };

//     fetchData();
//   }, [user, navigate]);

//   return (
//     <div className="container mt-4">
//       <div className="text-center mb-5">
//         <h2 className="fw-bold">Welcome, {user?.name || "Instructor"} Sir 👋</h2>
//         <p className="text-muted">
//           Manage your courses, assessments, and view student performance.
//         </p>
//       </div>

//       {/* METRIC BLOCKS */}
//       <div className="row text-center mb-4">
//         <div className="col-md-4 mb-3">
//           <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
//             <h1 className="display-2 fw-bold text-primary">{courses.length}</h1>
//             <p className="mt-2 text-muted">Courses Created</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
//             <h1 className="display-2 fw-bold text-success">
//               {assessments.length}
//             </h1>
//             <p className="mt-2 text-muted">Assessments Created</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div className="card shadow-sm border-0 rounded-4 py-4 h-100">
//             <h1 className="display-2 fw-bold text-danger">
//               {studentResults.length}
//             </h1>
//             <p className="mt-2 text-muted">Student Submissions</p>
//           </div>
//         </div>
//       </div>

//       {/* DETAIL SECTIONS */}
//       <div className="row">
//         {/* Courses */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0 rounded-4">
//             <h5 className="text-secondary mb-3">Courses</h5>
//             <ul className="scrollable-list text-dark">
//               {courses.length > 0 ? (
//                 courses.map((course) => (
//                   <li key={course.courseId}>{course.title}</li>
//                 ))
//               ) : (
//                 <li className="text-muted">No courses created yet.</li>
//               )}
//             </ul>
//             <Link
//               to="/course"
//               className="btn btn-outline-primary btn-sm mt-2 rounded-pill"
//             >
//               Manage Courses
//             </Link>
//           </div>
//         </div>

//         {/* Assessments */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0 rounded-4">
//             <h5 className="text-secondary mb-3">Assessments</h5>
//             <ul className="scrollable-list text-dark">
//               {assessments.length > 0 ? (
//                 assessments.map((a) => <li key={a.assessmentId}>{a.title}</li>)
//               ) : (
//                 <li className="text-muted">No assessments found.</li>
//               )}
//             </ul>
//             <Link
//               to="/assessments"
//               className="btn btn-outline-success btn-sm mt-2 rounded-pill"
//             >
//               Manage Assessments
//             </Link>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3 h-100 border-0 rounded-4">
//             <h5 className="text-secondary mb-3">Student Performance</h5>
//             <ul className="scrollable-list text-dark">
//               {studentResults.length > 0 ? (
//                 studentResults.map((r) => (
//                   <li key={r.resultId}>
//                     {r.user?.name || "Student"} –{" "}
//                     {r.assessment?.title || "Assessment"}:{" "}
//                     <strong>{r.score}%</strong>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-muted">No results submitted yet.</li>
//               )}
//             </ul>
//             <Link
//               to="/instructor-result"
//               className="btn btn-outline-danger btn-sm mt-2 rounded-pill"
//             >
//               View Results
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;

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

