// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { submitResult } from '../services/resultService';


// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const AttemptAssessmentPage = () => {
//   const { assessmentId } = useParams();
//   const navigate = useNavigate();
//   const [assessment, setAssessment] = useState(null);
//   // const [score, setScore] = useState('');
//   const [answers, setAnswers] = useState('');
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user || user.role !== 'Student') {
//       alert('Only students can attempt assessments');
//       navigate('/login');
//       return;
//     }

//     axios.get(`${API_URL}/AssessmentModels/${assessmentId}`)
//       .then(res => setAssessment(res.data))
//       .catch(err => console.error('Failed to load assessment', err));
//   }, [assessmentId, user, navigate]);

//   const handleScoreChange = (index, value) => {
//     setAnswers(prev => ({ ...prev, [index]: value }));
//   };

//   const calculateScore = () => {
//     let targetedScore = 0;
//     const questions = JSON.parse(assessment.questions);
//     questions.forEach((q, index) => {
//       if (q.type === 'mcq' && answers[index] === q.correctAnswer) {
//         targetedScore += 5;
//       }
//       // Optional: add text answer grading logic here
//     });
//     return targetedScore;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const finalscore = calculateScore();

//     try {
//       await submitResult({
//         resultId: crypto.randomUUID(),
//         assessmentId: assessment.assessmentId,
//         userId: user.userId,
//         score: finalscore,
//         attemptDate: new Date().toISOString(),
//       });

//       alert('Result submitted successfully! Your score: ${finalscore}');
//       navigate(`/assessments`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit result.');
//     }
//   };

//   if (!assessment) return <div>Loading assessment...</div>;

//   const questions = JSON.parse(assessment.questions);

//   return (
//     <div>
//       <h2>Attempt Assessment: {assessment.title}</h2>
//       <form onSubmit={handleSubmit}>
//         {questions.map((q, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <p><strong>{index + 1}. {q.questionText}</strong></p>
//             {q.type === 'mcq' ? (
//               q.options.map((opt, i) => (
//                 <label key={i} style={{ display: 'block' }}>
//                   <input
//                     type="radio"
//                     name={`q${index}`}
//                     value={opt}
//                     checked={answers[index] === opt}
//                     onChange={() => handleScoreChange(index, opt)}
//                     required
//                   />
//                   {opt}
//                 </label>
//               ))
//             ) : (
//               <textarea
//                 rows="3"
//                 cols="50"
//                 value={answers[index] || ''}
//                 onChange={(e) => handleScoreChange(index, e.target.value)}
//                 required
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit">Submit Quiz</button>
//       </form>
//     </div>
//   );
// };

// export default AttemptAssessmentPage;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { submitResult } from "../services/resultService";

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const AttemptAssessmentPage = () => {
//   const { assessmentId } = useParams();
//   const navigate = useNavigate();
//   const [assessment, setAssessment] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user || user.role !== "Student") {
//       alert("Only students can attempt assessments");
//       navigate("/login");
//       return;
//     }

//     axios
//       .get(`${API_URL}/AssessmentModels/${assessmentId}`)
//       .then((res) => setAssessment(res.data))
//       .catch((err) => console.error("Failed to load assessment", err));
//   }, [assessmentId, user, navigate]);

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSelectOption = (index, option) => {
//     setAnswers((prev) => ({ ...prev, [index]: option }));
//   };

//   const handleTextChange = (index, value) => {
//     setAnswers((prev) => ({ ...prev, [index]: value }));
//   };

//   const calculateScore = () => {
//     let score = 0;
//     const questions = JSON.parse(assessment.questions);
//     questions.forEach((q, index) => {
//       if (q.type === "mcq" && answers[index] === q.correctAnswer) {
//         score += 5;
//       }
//     });
//     return score;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalScore = calculateScore();

//     try {
//       await submitResult({
//         resultId: crypto.randomUUID(),
//         assessmentId: assessment.assessmentId,
//         userId: user.userId,
//         score: finalScore,
//         attemptDate: new Date().toISOString(),
//       });

//       alert(`Result submitted successfully! Your score: ${finalScore}`);
//       navigate(`/assessments`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit result.");
//     }
//   };

//   if (!assessment)
//     return <div className="container mt-5">Loading assessment...</div>;

//   const questions = JSON.parse(assessment.questions);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">
//         Attempt Assessment: <strong>{assessment.title}</strong>
//       </h2>
//       <form onSubmit={handleSubmit}>
//         {questions.map((q, index) => (
//           <div key={index} className="mb-4">
//             <p className="fw-bold">
//               {index + 1}. {q.questionText}
//             </p>
//             {q.type === "mcq" ? (
//               <div className="d-flex flex-column gap-2">
//                 {q.options.map((opt, i) => (
//                   <div
//                     key={i}
//                     className={`p-2 rounded border ${
//                       answers[index] === opt
//                         ? "bg-success text-white"
//                         : "bg-light"
//                     }`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleSelectOption(index, opt)}
//                   >
//                     {opt}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <textarea
//                 rows="3"
//                 className="form-control"
//                 value={answers[index] || ""}
//                 onChange={(e) => handleTextChange(index, e.target.value)}
//                 required
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit" className="btn btn-primary rounded-pill px-4">
//           Submit Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AttemptAssessmentPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { submitResult } from "../services/resultService";

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const AttemptAssessmentPage = () => {
//   const { assessmentId } = useParams();
//   const navigate = useNavigate();
//   const [assessment, setAssessment] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user || user.role !== "Student") {
//       alert("Only students can attempt assessments");
//       navigate("/login");
//       return;
//     }

//     axios
//       .get(`${API_URL}/AssessmentModels/${assessmentId}`)
//       .then((res) => setAssessment(res.data))
//       .catch((err) => console.error("Failed to load assessment", err));
//   }, [assessmentId, user, navigate]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSelectOption = (index, option) => {
//     setAnswers((prev) => ({ ...prev, [index]: option }));
//   };

//   const handleTextChange = (index, value) => {
//     setAnswers((prev) => ({ ...prev, [index]: value }));
//   };

//   const calculateScore = () => {
//     let score = 0;
//     const questions = JSON.parse(assessment.questions);
//     questions.forEach((q, index) => {
//       if (q.type === "mcq" && answers[index] === q.correctAnswer) {
//         score += 5;
//       }
//     });
//     return score;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalScore = calculateScore();

//     try {
//       await submitResult({
//         resultId: crypto.randomUUID(),
//         assessmentId: assessment.assessmentId,
//         userId: user.userId,
//         score: finalScore,
//         attemptDate: new Date().toISOString(),
//       });

//       alert(`Result submitted successfully! Your score: ${finalScore}`);
//       navigate(`/assessments`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit result.");
//     }
//   };

//   if (!assessment) return <div className="centered">Loading assessment...</div>;

//   const questions = JSON.parse(assessment.questions);

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>Assessment Topic: {assessment.title}</h2>
//       </div>
//       <form onSubmit={handleSubmit}>
//         {questions.map((q, index) => (
//           <div key={index} style={styles.questionCard}>
//             <p style={styles.questionText}>
//               {index + 1}. {q.questionText}
//             </p>
//             {q.type === "mcq" ? (
//               <div style={styles.optionsContainer}>
//                 {q.options.map((opt, i) => (
//                   <div
//                     key={i}
//                     onClick={() => handleSelectOption(index, opt)}
//                     style={{
//                       ...styles.option,
//                       backgroundColor:
//                         answers[index] === opt ? "#007bff" : "#f1f1f1",
//                       color: answers[index] === opt ? "white" : "#333",
//                       border:
//                         answers[index] === opt
//                           ? "2px solid #007bff"
//                           : "1px solid #ccc",
//                     }}
//                   >
//                     {opt}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <textarea
//                 rows="3"
//                 placeholder="Write your answer..."
//                 style={styles.textarea}
//                 value={answers[index] || ""}
//                 onChange={(e) => handleTextChange(index, e.target.value)}
//                 required
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit" style={styles.submitButton}>
//           Submit Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "800px",
//     margin: "2px auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "bold",
//     marginBottom: "5px",
//   },
//   subtitle: {
//     fontSize: "20px",
//     color: "#666",
//   },
//   questionCard: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     marginBottom: "25px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//     border: "1px solid #ddd",
//   },
//   questionText: {
//     fontSize: "16px",
//     marginBottom: "12px",
//     fontWeight: "500",
//   },
//   optionsContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//   },
//   option: {
//     padding: "8px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "all 0.2s ease-in-out",
//     fontSize: "14px",
//     userSelect: "none",
//   },
//   textarea: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     resize: "vertical",
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     padding: "12px 30px",
//     borderRadius: "25px",
//     fontSize: "16px",
//     cursor: "pointer",
//     display: "block",
//     margin: "30px auto 0",
//     transition: "background 0.2s",
//   },
// };

// export default AttemptAssessmentPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { submitResult } from "../services/resultService";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AttemptAssessmentPage = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "Student") {
      alert("Only students can attempt assessments");
      navigate("/login");
      return;
    }

    axios
      .get(`${API_URL}/AssessmentModels/${assessmentId}`)
      .then((res) => setAssessment(res.data))
      .catch((err) => console.error("Failed to load assessment", err));
  }, [assessmentId, user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectOption = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleTextChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    const questions = JSON.parse(assessment.questions);
    questions.forEach((q, index) => {
      if (
        Array.isArray(q.options) &&
        q.options.length > 0 &&
        answers[index] === q.correctAnswer
      ) {
        score += 5;
      }
    });
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalScore = calculateScore();

    try {
      await submitResult({
        resultId: crypto.randomUUID(),
        assessmentId: assessment.assessmentId,
        userId: user.userId,
        score: finalScore,
        attemptDate: new Date().toISOString(),
      });

      alert(`Result submitted successfully! Your score: ${finalScore}`);
      navigate(`/assessments`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit result.");
    }
  };

  if (!assessment)
    return <div className="text-center mt-5">Loading assessment...</div>;

  const questions = JSON.parse(assessment.questions);

  return (
    <div
      style={{
        backgroundColor: "#f0f7ff",
        minHeight: "100vh",
        padding: "30px 0",
      }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Assessment Topic: {assessment.title}</h2>
          <p className="text-muted">
            Answer the questions carefully before submitting
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div
              className="card mb-4 shadow-sm rounded-4"
              key={index}
              style={{
                border: "1px solid #dfefff",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="card-body">
                <p className="fw-semibold fs-5 mb-3 text-dark">
                  {index + 1}. {q.questionText}
                </p>

                {Array.isArray(q.options) && q.options.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {q.options.map((opt, i) => (
                      <button
                        type="button"
                        key={i}
                        className={`btn text-start rounded-pill ${
                          answers[index] === opt
                            ? "btn-primary text-white"
                            : "btn-outline-primary bg-light"
                        }`}
                        onClick={() => handleSelectOption(index, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    className="form-control mt-2 rounded-3"
                    rows={4}
                    placeholder="Write your answer..."
                    style={{ backgroundColor: "#f9f9f9" }}
                    value={answers[index] || ""}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    required
                  />
                )}
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success btn-lg px-5 rounded-pill shadow-sm"
            >
              Submit Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttemptAssessmentPage;
