import React, { useState, useEffect } from 'react';
import { getAssessments, submitResult } from '../services/resultService';
import { useNavigate } from 'react-router-dom';

const SubmitResultPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [formData, setFormData] = useState({
    assessmentId: '',
    score: 0,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'Student') {
      alert("Only students can submit results.");
      navigate('/login');
    } else {
      getAssessments().then(setAssessments).catch(console.error);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'score' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assessmentId) {
      alert("Please select an assessment.");
      return;
    }

    try {
      const resultToPost = {
        resultId: crypto.randomUUID(),
        assessmentId: formData.assessmentId,
        userId: user.userId,
        score: formData.score,
        attemptDate: new Date().toISOString()
      };

      await submitResult(resultToPost);
      alert('Result submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to submit result.');
    }
  };

  return (
    <div>
      <h2>Submit Result</h2>
      <form onSubmit={handleSubmit}>
        <select name="assessmentId" onChange={handleChange} required>
          <option value="">Select Assessment</option>
          {assessments.map(a => (
            <option key={a.assessmentId} value={a.assessmentId}>{a.title}</option>
          ))}
        </select><br />
        <input
          name="score"
          type="number"
          min="0"
          max="100"
          placeholder="Score"
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Submit Result</button>
      </form>
    </div>
  );
};

export default SubmitResultPage;

// import React, { useState, useEffect } from "react";
// import { getAssessments, submitResult } from "../services/resultService";
// import { useNavigate } from "react-router-dom";

// const SubmitResultPage = () => {
//   const [assessments, setAssessments] = useState([]);
//   const [formData, setFormData] = useState({
//     assessmentId: "",
//     score: 0,
//   });

//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || user.role !== "Student") {
//       alert("Only students can submit results.");
//       navigate("/login");
//     } else {
//       getAssessments().then(setAssessments).catch(console.error);
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "score" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.assessmentId) {
//       alert("Please select an assessment.");
//       return;
//     }

//     try {
//       const resultToPost = {
//         resultId: crypto.randomUUID(),
//         assessmentId: formData.assessmentId,
//         userId: user.userId,
//         score: formData.score,
//         attemptDate: new Date().toISOString(),
//       };

//       await submitResult(resultToPost);
//       alert("Result submitted successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit result.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow-sm">
//         <h3 className="mb-4 text-center text-primary">
//           Submit Assessment Result
//         </h3>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Select Assessment</label>
//             <select
//               name="assessmentId"
//               className="form-select rounded-pill"
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Choose an Assessment --</option>
//               {assessments.map((a) => (
//                 <option key={a.assessmentId} value={a.assessmentId}>
//                   {a.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {formData.assessmentId && (
//             <>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">
//                   Enter Your Score
//                 </label>
//                 <input
//                   name="score"
//                   type="number"
//                   className="form-control rounded-pill"
//                   min="0"
//                   max="100"
//                   placeholder="Score"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="d-grid">
//                 <button type="submit" className="btn btn-success rounded-pill">
//                   Submit Result
//                 </button>
//               </div>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubmitResultPage;
