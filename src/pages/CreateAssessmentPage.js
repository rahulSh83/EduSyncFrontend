// import React, { useState, useEffect } from "react";
// import { createAssessment } from "../services/assessmentService";
// import { getAllCourses } from "../services/courseService";
// import { useNavigate } from "react-router-dom";

// const CreateAssessmentPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({
//     courseId: "",
//     title: "",
//     questions: "", // We'll treat as JSON string or raw text for now
//     maxScore: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || user.role !== "Instructor") {
//       alert("Only instructors can create assessments.");
//       navigate("/login");
//     } else {
//       getAllCourses().then(setCourses).catch(console.error);
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "maxScore" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.courseId) {
//       alert("Please select a course.");
//       return;
//     }

//     try {
//       const assessmentToPost = {
//         assessmentId: crypto.randomUUID(), // or let backend generate
//         courseId: formData.courseId,
//         title: formData.title,
//         questions: formData.questions,
//         maxScore: formData.maxScore,
//       };

//       await createAssessment(assessmentToPost);
//       alert("Assessment created!");
//       navigate("/assessments");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create assessment.");
//     }
//   };

//   return (
//     <div className="container mt">
//       <h2 className="mb-4">Create New Assessment</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="p-4 shadow-sm border rounded bg-light"
//       >
//         <div className="mb-3">
//           <label htmlFor="courseId" className="form-label">
//             Course
//           </label>
//           <select
//             className="form-select"
//             name="courseId"
//             value={formData.courseId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Course</option>
//             {Array.isArray(courses) &&
//               courses.map((course) => (
//                 <option key={course.courseId} value={course.courseId}>
//                   {course.title}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Assessment Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="title"
//             placeholder="Enter assessment title"
//             value={formData.title}
//             onChange={handleChange}
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
//             placeholder={`
//             [
//               {
//               "questionText": "What is 2 + 2?",
//               "type": "mcq",
//               "options": ["3", "4", "5"],
//               "correctAnswer": "4"
//               }
//             ]`}
//             value={formData.questions}
//             onChange={handleChange}
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
//             placeholder="Enter maximum score"
//             min="1"
//             value={formData.maxScore}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Assessment
//         </button>
//       </form>
//       <button 
//         className="btn btn-secondary mt-5 rounded-pill"
//         onClick={() => {
//           navigate("/assessments");
//       }} 
//       > ← Back to Assessments</button>
//     </div>
//   );
// };

// export default CreateAssessmentPage;


import React, { useState, useEffect } from "react";
import { createAssessment } from "../services/assessmentService";
import { getAllCourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";

const CreateAssessmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    maxScore: "",
  });
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", ""], correctAnswer: "" },
  ]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "Instructor") {
      alert("Only instructors can create assessments.");
      navigate("/login");
    } else {
      getAllCourses().then(setCourses).catch(console.error);
    }
  }, [user, navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", ""], correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseId || !formData.title || !formData.maxScore) {
      alert("Please fill all required fields.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const { questionText, options, correctAnswer } = questions[i];

      if (!questionText.trim()) {
        alert(`Question ${i + 1} is empty`);
        return;
      }

      if (options.length < 2 || options.some((opt) => !opt.trim())) {
        alert(`Each question must have at least two non-empty options.`);
        return;
      }

      if (!correctAnswer.trim() || !options.includes(correctAnswer.trim())) {
        alert(
          `Correct answer for question ${i + 1} must match one of the options.`
        );
        return;
      }
    }

    

    try {
      const assessmentToPost = {
        assessmentId: crypto.randomUUID(),
        courseId: formData.courseId,
        title: formData.title,
        questions: JSON.stringify(questions),
        maxScore: Number(formData.maxScore),
      };

      console.log("Submitting assessment:", assessmentToPost);

      await createAssessment(assessmentToPost);
      alert("Assessment created!");
      navigate("/assessments");
    } catch (err) {
      console.error(err);
      alert("Failed to create assessment.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary">Create New Assessment</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white shadow-sm"
      >
        <div className="mb-3">
          <label className="form-label">Select Course</label>
          <select
            className="form-select"
            name="courseId"
            value={formData.courseId}
            onChange={handleFormChange}
            required
          >
            <option value="">-- Select --</option>
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Assessment Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Max Score</label>
          <input
            type="number"
            className="form-control"
            name="maxScore"
            min="1"
            value={formData.maxScore}
            onChange={handleFormChange}
            required
          />
        </div>

        <hr />
        <h5 className="text-dark mb-3">Questions</h5>
        {questions.map((q, i) => (
          <div key={i} className="border rounded p-3 mb-4 bg-light">
            <div className="mb-2">
              <label className="form-label">Question {i + 1}</label>
              <input
                type="text"
                className="form-control"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(i, "questionText", e.target.value)
                }
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Options</label>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  className="form-control mb-2"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  required
                />
              ))}
              <button
                type="button"
                onClick={() => addOption(i)}
                className="btn btn-sm btn-outline-secondary mt-1"
              >
                + Add Option
              </button>
            </div>

            <div className="mb-2">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                className="form-control"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(i, "correctAnswer", e.target.value)
                }
                required
              />
            </div>

            {questions.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger mt-2"
                onClick={() => removeQuestion(i)}
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="btn btn-outline-primary mb-4"
        >
          + Add Question
        </button>

        <div>
          <button type="submit" className="btn btn-success">
            Create Assessment
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => navigate("/assessments")}
          >
            ← Back to Assessments
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssessmentPage;

