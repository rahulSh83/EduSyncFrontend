// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const ResultPage = () => {
//   const [groupedResults, setGroupedResults] = useState({});
//   // const [instructorCourses, setInstructorCourses] = useState([]);
//   // const [selectedAssessment, setSelectedAssessment] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/ResultModels/student/${user.userId}/results`
//         );

//         // Group results by course title
//         const grouped = res.data.reduce((acc, result) => {
//           const course = result.courseTitle;
//           if (!acc[course]) acc[course] = [];
//           acc[course].push(result);
//           return acc;
//         }, {});

//         setGroupedResults(grouped);
//       } catch (error) {
//         console.error("Failed to fetch scores:", error);
//       }
//     };
//     fetchResults();
//   }, [user.userId]);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">📊 Your Assessment Scores</h2>

//       {Object.keys(groupedResults).length === 0 ? (
//         <p>No scores available.</p>
//       ) : (
//         Object.entries(groupedResults).map(([courseTitle, results]) => (
//           <div key={courseTitle} className="mb-5">
//             <h4 className="text-primary">{courseTitle}</h4>
//             <table className="table table-bordered mt-2">
//               <thead className="table-light">
//                 <tr>
//                   <th>Assessment</th>
//                   <th>Score</th>
//                   <th>Max Score</th>
//                   <th>Percentage</th>
//                   <th>Attempt Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((result, idx) => (
//                   <tr key={idx}>
//                     <td>{result.assessmentTitle}</td>
//                     <td>{result.score}</td>
//                     <td>{result.maxScore}</td>
//                     <td>
//                       {((result.score / result.maxScore) * 100).toFixed(2)}%
//                     </td>
//                     <td>{new Date(result.attemptDate).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}

//       <button
//         className="btn btn-secondary mt-3"
//         onClick={() => {
//           const user = JSON.parse(localStorage.getItem("user"));
//           if (user?.role === "Instructor") {
//             navigate("/instructor-dashboard");
//           } else {
//             navigate("/student-dashboard");
//           }
//         }}
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default ResultPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ResultPage = () => {
  const [groupedResults, setGroupedResults] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/ResultModels/student/${user.userId}/results`
        );

        const grouped = res.data.reduce((acc, result) => {
          const course = result.courseTitle;
          if (!acc[course]) acc[course] = [];
          acc[course].push(result);
          return acc;
        }, {});

        setGroupedResults(grouped);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };

    fetchResults();
  }, [user.userId]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center text-primary mb-4">
          📊 Your Assessment Scores
        </h3>

        {Object.keys(groupedResults).length === 0 ? (
          <p>No scores available.</p>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Course:</label>
              <select
                className="form-select rounded-pill"
                value={selectedCourse}
                onChange={handleCourseChange}
              >
                <option value="">-- Choose a Course --</option>
                <option value="ALL">Select All Courses</option>
                {Object.keys(groupedResults).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="mt-4">
                <h5 className="text-success mb-3">
                  {selectedCourse === "ALL" ? "All Courses Results" : selectedCourse}
                </h5>
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      {selectedCourse === "ALL" && <th>Course</th>}
                      <th>Assessment</th>
                      <th>Score</th>
                      <th>Max Score</th>
                      <th>Percentage</th>
                      <th>Attempt Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedCourse === "ALL"
                      ? Object.entries(groupedResults).flatMap(
                          ([course, results]) =>
                            results.map((result) => ({ ...result, course }))
                        )
                      : groupedResults[selectedCourse]
                    ).map((result, idx) => (
                      <tr key={idx}>
                        {selectedCourse === "ALL" && <td>{result.course}</td>}
                        <td>{result.assessmentTitle}</td>
                        <td>{result.score}</td>
                        <td>{result.maxScore}</td>
                        <td>
                          {((result.score / result.maxScore) * 100).toFixed(2)}%
                        </td>
                        <td>{new Date(result.attemptDate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        <div className="text-end mt-3">
          <button
            className="btn btn-secondary rounded-pill"
            onClick={() => {
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
      </div>
    </div>
  );
};

export default ResultPage;
