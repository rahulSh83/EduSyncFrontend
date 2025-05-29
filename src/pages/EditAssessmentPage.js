// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_BASE_URL;

// const EditAssessmentPage = () => {
//   const { assessmentId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: '',
//     questions: '',
//     maxScore: 0,
//     courseId: ''
//   });

//   useEffect(() => {
//     const fetchAssessment = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/AssessmentModels/${assessmentId}`);
//         const data = res.data;
//         setFormData({
//           title: data.title,
//           questions: data.questions,
//           maxScore: data.maxScore,
//           courseId: data.courseId
//         });
//       } catch (err) {
//         console.error('Failed to load assessment:', err);
//         alert('Failed to load assessment');
//         navigate(-1);
//       }
//     };

//     fetchAssessment();
//   }, [assessmentId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'maxScore' ? Number(value) : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(`${API_URL}/AssessmentModels/${assessmentId}`, {
//         assessmentId,
//         ...formData
//       });

//       alert('Assessment updated successfully');
//       navigate("/assessments");
//     } catch (err) {
//       console.error('Failed to update assessment:', err);
//       alert('Update failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Edit Assessment</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="p-4 shadow-sm border rounded bg-light"
//       >
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Assessment Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter assessment title"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="questions" className="form-label">
//             Questions (JSON format)
//           </label>
//           <textarea
//             className="form-control"
//             name="questions"
//             rows="6"
//             value={formData.questions}
//             onChange={handleChange}
//             placeholder="Assessment questions in JSON format"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="maxScore" className="form-label">
//             Max Score
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             name="maxScore"
//             value={formData.maxScore}
//             onChange={handleChange}
//             placeholder="Enter maximum score"
//             min="1"
//             required
//           />
//         </div>

//         <div className="d-flex">
//           <button type="submit" className="btn btn-primary">
//             Update Assessment
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary ms-2"
//             onClick={() => navigate(-1)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );  
// };

// export default EditAssessmentPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const EditAssessmentPage = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    questions: [],
    maxScore: 0,
    courseId: "",
  });

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/AssessmentModels/${assessmentId}`
        );
        const data = res.data;

        let questionsParsed = [];
        try {
          questionsParsed = data.questions ? JSON.parse(data.questions) : [];
        } catch {
          questionsParsed = [];
        }

        setFormData({
          title: data.title || "",
          questions: questionsParsed,
          maxScore: data.maxScore || 0,
          courseId: data.courseId || "",
        });
      } catch (err) {
        console.error("Failed to load assessment:", err);
        alert("Failed to load assessment");
        navigate(-1);
      }
    };

    fetchAssessment();
  }, [assessmentId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxScore" ? Number(value) : value,
    }));
  };

  const handleQuestionTextChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].questionText = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[optIndex] = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].correctAnswer = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionsJson = JSON.stringify(formData.questions);

      await axios.put(`${API_URL}/AssessmentModels/${assessmentId}`, {
        assessmentId,
        title: formData.title,
        questions: questionsJson,
        maxScore: formData.maxScore,
        courseId: formData.courseId,
      });

      alert("Assessment updated successfully");
      navigate("/assessments");
    } catch (err) {
      console.error("Failed to update assessment:", err);
      alert("Update failed");
    }
  };

  return (
    <div
      className="container mt-2"
      style={{ maxWidth: 700, margin: "auto", fontSize: "0.9rem" }}
    >
      <h2 className="mb-4 text-center">Edit Assessment</h2>
      <form
        onSubmit={handleSubmit}
        className="p-3 shadow-sm border rounded bg-light"
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Assessment Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter assessment title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Questions</label>
          {formData.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="mb-3 p-3 border rounded bg-white shadow-sm"
              style={{ fontSize: "0.9rem" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 style={{ fontSize: "1.1rem" }}>Question {qIndex + 1}</h5>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeQuestion(qIndex)}
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Question text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionTextChange(qIndex, e.target.value)
                }
                required
              />

              <div>
                <label className="form-label">Options</label>
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    className="form-control mb-2"
                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                    required
                  />
                ))}
              </div>

              <div>
                <label className="form-label">Correct Answer</label>
                <select
                  className="form-select"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleCorrectAnswerChange(qIndex, e.target.value)
                  }
                  required
                >
                  <option value="">Select correct answer</option>
                  {q.options.map((opt, optIndex) => (
                    <option key={optIndex} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-success"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="maxScore" className="form-label">
            Max Score
          </label>
          <input
            type="number"
            className="form-control"
            name="maxScore"
            value={formData.maxScore}
            onChange={handleChange}
            placeholder="Enter maximum score"
            min="1"
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary me-2">
            Update Assessment
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAssessmentPage;
