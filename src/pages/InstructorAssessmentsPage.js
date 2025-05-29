// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const InstructorAssessmentsPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const [assessments, setAssessments] = useState([]);
//   const [courseTitle, setCourseTitle] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const courseRes = await axios.get(`${API_URL}/CourseModels/${courseId}`);
//         setCourseTitle(courseRes.data.title);
    
//         const assessmentsRes = await axios.get(`${API_URL}/AssessmentModels`);
//         const filtered = assessmentsRes.data.filter(a => a.courseId === courseId);
//         setAssessments(filtered);
    
//         // console.log(assessmentsRes.data); // ✅ This logs the full list of assessments
    
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load data.');
//         setLoading(false);
//       }
//     };
    

//     fetchData();
//   }, [courseId]);

//   const handleDeleteAssessment = async (assessmentId) => {
//     if (window.confirm("Delete this assessment?")) {
//       try {
//         await axios.delete(`${API_URL}/AssessmentModels/${assessmentId}`);
//         alert("Assessment deleted");
//         setAssessments(prev => prev.filter(a => a.assessmentId !== assessmentId));
//       } catch (err) {
//         console.error("Delete failed:", err);
//         alert("Could not delete assessment");
//       }
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h2>Manage Assessments for: <strong>{courseTitle || courseId}</strong></h2>

//       <button
//         className="btn btn-primary mb-3"
//         onClick={() => navigate(`/assessments/create?courseId=${courseId}`)}
//       >
//         Create New Assessment
//       </button>

//       {assessments.length === 0 ? (
//         <p>No assessments found for this course.</p>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Max Score</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assessments.map(a => (
//               <tr key={a.assessmentId}>
//                 <td>{a.title}</td>
//                 <td>{a.maxScore}</td>
//                 <td>
                  
//                   <Link
//                     to={`/assessments/view/${a.assessmentId}`}
//                     className="btn btn-sm btn-outline-primary me-2"
//                   >
//                     View
//                   </Link>
//                   <Link
//                     to={`/assessments/edit/${a.assessmentId}`}
//                     className="btn btn-sm btn-warning me-2"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     className="btn btn-sm btn-danger me-2"
//                     onClick={() => handleDeleteAssessment(a.assessmentId)}
//                   >
//                     Delete
//                   </button>
//                   {user?.role === 'Instructor' && (
//                    <Link
//                       to={`/results/review/${a.assessmentId}`}
//                       className="btn btn-sm btn-primary"
//                     >
//                     Review Results
//                   </Link>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <button className="btn btn-secondary mt-3" onClick={() => navigate('/course')}>
//         Back to Courses
//       </button>
//     </div>
//   );
// };

// export default InstructorAssessmentsPage;

