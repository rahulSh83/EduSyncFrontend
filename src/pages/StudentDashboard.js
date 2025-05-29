// import React, { useEffect, useState } from "react";
// import {
//   getAvailableCourses,
//   getEnrolledCourses,
//   getPerformanceReports,
// } from "../services/studentService";

// const StudentDashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [availableCourses, setAvailableCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [performanceReports, setPerformanceReports] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const available = await getAvailableCourses();
//       const enrolled = await getEnrolledCourses(user.UserId);
//       const reports = await getPerformanceReports(user.UserId);

//       setAvailableCourses(available);
//       setEnrolledCourses(enrolled);
//       setPerformanceReports(reports);
//     };

//     fetchData();
//   }, [user.UserId]);

//   return (
//     <div className="container mt-4">
//       <h2>Welcome, {user.Name} 👋</h2>

//       <div className="row mt-4">
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h5>Available Courses</h5>
//             <ul>
//               {availableCourses.map((course) => (
//                 <li key={course.courseId}>{course.title}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h5>Enrolled Courses</h5>
//             <ul>
//               {enrolledCourses.map((course) => (
//                 <li key={course.courseId}>{course.title}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h5>Performance Reports</h5>
//             <ul>
//               {performanceReports.map((report) => (
//                 <li key={report.assessmentId}>
//                   {report.courseTitle} - {report.score}%
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAvailableCourses,
//   getEnrolledCourses,
//   getPerformanceReports,
// } from "../services/studentService";

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [availableCourses, setAvailableCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [performanceReports, setPerformanceReports] = useState([]);

//   useEffect(() => {
//     if (!user || user.role !== "Student") {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const available = await getAvailableCourses();
//         const enrolled = await getEnrolledCourses(user.userId); // <-- ensure this key is `userId`
//         const reports = await getPerformanceReports(user.userId);
//         setAvailableCourses(available);
//         setEnrolledCourses(enrolled);
//         setPerformanceReports(reports);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load dashboard data.");
//       }
//     };

//     fetchData();
//   }, [user, navigate]);

//   return (
//     <div className="container mt-4">
//       <h2>Welcome, {user?.name} 👋</h2>
//       <div className="row mt-4">
//         {/* Enrolled Courses Block */}
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h4 className="mb-3">My Courses</h4>
//             <button
//               className="btn btn-outline-primary mb-2"
//               onClick={() => navigate("/courses")}
//             >
//               Go to Courses
//             </button>
//             <ul className="list-group">
//               {enrolledCourses.length > 0 ? (
//                 enrolledCourses.map((course) => (
//                   <li key={course.courseId} className="list-group-item">
//                     {course.title}
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-muted">
//                   No courses enrolled
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Assessments Block */}
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h4 className="mb-3">Assessments</h4>
//             <button
//               className="btn btn-outline-success mb-2"
//               onClick={() => navigate("/assessments")}
//             >
//               Go to Assessments
//             </button>
//             <p className="text-muted">
//               Take quizzes for your enrolled courses.
//             </p>
//           </div>
//         </div>

//         {/* Scores Block */}
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <h4 className="mb-3">My Scores</h4>
//             <button
//               className="btn btn-outline-info mb-2"
//               onClick={() => navigate("/results")}
//             >
//               View Results
//             </button>
//             <ul className="list-group">
//               {performanceReports.length > 0 ? (
//                 performanceReports.map((report) => (
//                   <li key={report.assessmentId} className="list-group-item">
//                     {report.courseTitle}: {report.score}%
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-muted">
//                   No results available
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useEffect, useState } from "react";
import {
  getAvailableCourses,
  getEnrolledCourses,
  getPerformanceReports,
} from "../services/studentService";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [performanceReports, setPerformanceReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const available = await getAvailableCourses();
        const enrolled = await getEnrolledCourses(user.userId);
        const reports = await getPerformanceReports(user.userId);

        setAvailableCourses(available);
        setEnrolledCourses(enrolled);
        setPerformanceReports(reports);
      } catch (err) {
        console.error("Error loading student dashboard data:", err);
      }
    };

    fetchData();
  }, [user.userId]);

  return (
    <div className="container mt-1">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, {user.name} 👋</h2>
        <p className="text-muted">
          Explore your courses, track your progress, and keep learning!
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">
        {/* Available Courses */}
        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 rounded-4 text-center d-flex flex-column justify-content-between"
            style={{ height: "180px", padding: "1rem" }}
          >
            <h5 className="fw-semibold text-secondary mb-2">
              📚 Available Courses
            </h5>
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "4.5rem", lineHeight: "1" }}
              >
                {availableCourses.length}
              </span>
            </div>
          </div>
        </div>
        {/* Enrolled Courses */}
        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 rounded-4 text-center d-flex flex-column justify-content-between"
            style={{ height: "180px", padding: "1rem" }}
          >
            <h5 className="fw-semibold text-secondary mb-2">
              ✅ Enrolled Courses
            </h5>
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "4.5rem", lineHeight: "1" }}
              >
                {enrolledCourses.length}
              </span>
            </div>
          </div>
        </div>
        {/* Performance Reports */}
        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 rounded-4 text-center d-flex flex-column justify-content-between"
            style={{ height: "180px", padding: "1rem" }}
          >
            <h5 className="fw-semibold text-secondary mb-2">
              📈 Quiz Submitted 
              </h5>
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "4.5rem", lineHeight: "1" }}
              >
                {performanceReports.length}
              </span>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="d-flex justify-content-center flex-wrap gap-4 mb-5">
          <button
            className="btn px-5 py-3 rounded-pill fw-semibold shadow-sm"
            style={{
              backgroundColor: "#e6f0ff", // light blue
              color: "#004085",
              minWidth: "200px",
              fontSize: "1.1rem",
              border: "2px solid #b8daff",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d0e7ff";
              e.target.style.borderColor = "#91caff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e6f0ff";
              e.target.style.borderColor = "#b8daff";
            }}
            onClick={() => navigate("/course")}
          >
            📘 Go to Courses
          </button>

          <button
            className="btn px-5 py-3 rounded-pill fw-semibold shadow-sm"
            style={{
              backgroundColor: "#e8f5e9", // light green
              color: "#1b5e20",
              minWidth: "200px",
              fontSize: "1.1rem",
              border: "2px solid #c8e6c9",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d6edd9";
              e.target.style.borderColor = "#a5d6a7";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e8f5e9";
              e.target.style.borderColor = "#c8e6c9";
            }}
            onClick={() => navigate("/assessments")}
          >
            📝 Take Assessments
          </button>

          <button
            className="btn px-5 py-3 rounded-pill fw-semibold shadow-sm"
            style={{
              backgroundColor: "#e3f2fd", // light teal
              color: "#01579b",
              minWidth: "200px",
              fontSize: "1.1rem",
              border: "2px solid #b3e5fc",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d0ebfc";
              e.target.style.borderColor = "#81d4fa";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e3f2fd";
              e.target.style.borderColor = "#b3e5fc";
            }}
            onClick={() => navigate("/result")}
          >
            📊 My Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

