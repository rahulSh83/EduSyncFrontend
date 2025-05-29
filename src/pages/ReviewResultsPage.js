// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getResultsByAssessmentId } from '../services/resultService';
// import axios from 'axios';

// const ReviewResultsPage = () => {
//   const { assessmentId } = useParams();
//   const [results, setResults] = useState([]);
//   const [assessment, setAssessment] = useState(null);
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await getResultsByAssessmentId(assessmentId);
//         setResults(res);

//         const assessmentRes = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/AssessmentModels/${assessmentId}`
//         );
//         setAssessment(assessmentRes.data);
//       } catch (err) {
//         console.error('Failed to load results or assessment', err);
//       }
//     };

//     fetchResults();
//   }, [assessmentId]);

//   return (
//     <div>
//       <h2>Results for: {assessment?.title}</h2>

//       {results.length === 0 ? (
//         <p>No students have submitted this assessment yet.</p>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Student ID</th>
//               <th>Score</th>
//               <th>Attempt Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((r) => (
//               <tr key={r.resultId}>
//                 <td>{r.userId}</td>
//                 <td>{r.score}</td>
//                 <td>{new Date(r.attemptDate).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ReviewResultsPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ReviewResultsPage = () => {
  const { assessmentId } = useParams();
  const [results, setResults] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchAssessmentAndResults = async () => {
      try {
        // Fetch the assessment
        const assessmentRes = await axios.get(`${API_URL}/AssessmentModels/${assessmentId}`);
        setAssessment(assessmentRes.data);

        // Fetch the related course
        const courseRes = await axios.get(`${API_URL}/CourseModels/${assessmentRes.data.courseId}`);
        setCourse(courseRes.data);

        // Fetch all results
        const resultRes = await axios.get(`${API_URL}/ResultModels`);

        // Filter results only for this assessment
        const filteredResults = resultRes.data.filter(r => r.assessmentId === assessmentId);
        setResults(filteredResults);

      } catch (err) {
        console.error('Failed to load results:', err);
      }
    };

    fetchAssessmentAndResults();
  }, [assessmentId]);

  return (
    <div>
      <h2>Results for Assessment: {assessment?.title}</h2>
      <h4>Course: {course?.title}</h4>

      {results.length === 0 ? (
        <p>No results submitted yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result.resultId}>
                <td>{result.User?.name || result.userId}</td>
                <td>{result.score}</td>
                <td>{new Date(result.attemptDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewResultsPage;

