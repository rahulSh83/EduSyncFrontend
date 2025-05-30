import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  // const [assessments, setAssessments] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [results, setResults] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       const res = await axios.get(`${API_URL}/CourseModels/${courseId}`);
  //       setCourse(res.data);
  //     } catch (err) {
  //       console.error('Failed to fetch course', err);
  //     }
  //   };

  //   fetchCourse();
  // }, [courseId]);

  // useEffect(() => {
  //   const fetchAssessmentsAndResults = async () => {
  //     try {
  //       const assmts = await getAssessmentsByCourse(courseId);
  //       setAssessments(assmts);

  //       if (user && user.role === 'Student') {
  //         const resultsMap = {};
  //         for (const a of assmts) {
  //           const res = await getResultByUserAndAssessment(user.userId, a.assessmentId);
  //           resultsMap[a.assessmentId] = res.length ? res[0] : null;
  //         }
  //         setResults(resultsMap);
  //       }
  //     } catch (err) {
  //       console.error('Failed to fetch assessments or results', err);
  //     }
  //   };

  //   fetchAssessmentsAndResults();
  // }, [courseId, user]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_URL}/CourseModels/${courseId}`);
        setCourse(res.data);

        // Check if student is enrolled
        if (user.role === "Student") {
          const enrollmentRes = await axios.get(`${API_URL}/EnrollmentModels`);
          const enrollments = enrollmentRes.data || [];

          const enrolled = enrollments.some(
            (e) => e.userId === user.userId && e.courseId === courseId
          );
          setIsEnrolled(enrolled);
        } else {
          // If instructor or admin, bypass check
          setIsEnrolled(true);
        }
      } catch (err) {
        console.error("Error loading course data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    // fetchAssessments();
  }, [courseId, user]);

  
  const handleDownload = async (fullPath) => {
    try {
      // Extract just the filename (after last slash)
      const filename = fullPath.split("/").pop();

      const res = await axios.get(
        `${API_URL}/SasToken/download?filename=${encodeURIComponent(filename)}`
      );

      // window.open(res.data.downloadUrl, "_blank");
      const fileUrl = res.data.downloadUrl;

      // Fetch the blob from Azure
      const blobRes = await axios.get(fileUrl, {
        responseType: "blob",
      });

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(new Blob([blobRes.data]));

      // Create a temporary <a> element to trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    
    } catch (err) {
      console.error("Failed to get download link", err);
      alert("Download failed. Please try again.");
    }
  };
  // const fetchAssessments = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/AssessmentModels`);
  //     const filtered = res.data.filter((a) => a.courseId === courseId);
  //     setAssessments(filtered);
  //   } catch (err) {
  //     console.error("Failed to load assessments:", err);
  //   }
  // };

  // useEffect(() => {
  //   const checkEnrollment = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/EnrollmentModels`);
  //       const enrollments = response.data;
  //       const enrolled = enrollments.some(
  //         (e) => e.userId === user.userId && e.courseId === courseId
  //       );
  //       setIsEnrolled(enrolled);
  //     } catch (error) {
  //       console.error("Failed to check enrollment status:", error);
  //     }
  //   };

  //   checkEnrollment();
  // }, [user.userId, courseId]);

  if (loading) return <div className="container mt-5">Loading course...</div>;

  if (!isEnrolled) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning rounded-4 shadow-sm">
          <h5 className="mb-3">Access Restricted</h5>
          <p>Please enroll in this course to view the details.</p>
          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => navigate(-1)}
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <div className="card-body">
          <h2 className="card-title text-center text-primary display-5 mb-4 fw-bold">
            {course.title}
          </h2>

          <div className="mb-3">
            <h5 className="fw-semibold text-secondary">Description</h5>
            <p className="text-muted">{course.description}</p>
          </div>

          <div className="mb-3">
            <h5 className="fw-semibold text-secondary">Instructor</h5>
            <p className="text-muted">{course.instructorName}</p>
          </div>

          {course.mediaUrl && (
            <div className="mb-3">
              <h5 className="fw-semibold text-secondary">Media URL</h5>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleDownload(course.mediaUrl)}
              >
                {course.mediaUrl}
              </button>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => navigate(-1)}
            >
              ← Back to Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const CourseDetailPage = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [assessments, setAssessments] = useState([]);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/CourseModels/${courseId}`);
//         setCourse(res.data);
//       } catch (err) {
//         console.error('Failed to load course:', err);
//       }
//     };

//     const fetchAssessments = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/AssessmentModels`);
//         const filtered = res.data.filter(a => a.courseId === courseId);
//         setAssessments(filtered);
//       } catch (err) {
//         console.error('Failed to load assessments:', err);
//       }
//     };

//     fetchCourse();
//     fetchAssessments();
//   }, [courseId]);

//   return (
//     <div>
//       {course ? (
//         <>
//           <h2>{course.title}</h2>
//           <p>{course.description}</p>

//           <h4>Assessments</h4>
//           {assessments.length === 0 ? (
//             <p>No assessments available for this course.</p>
//           ) : (
//             <ul>
//               {assessments.map(a => (
//                 <li key={a.assessmentId}>
//                   {a.title} – Max Score: {a.maxScore}
//                   <Link to={`/assessments/attempt/${a.assessmentId}`} className="btn btn-sm btn-outline-primary ms-2">
//                     Attempt
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       ) : (
//         <p>Loading course...</p>
//       )}
//     </div>
//   );
// };

// export default CourseDetailPage;
