import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ViewAssessmentPage = () => {
  const { assessmentId } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/AssessmentModels/${assessmentId}`
        );
        setAssessment(res.data);
        // Parse questions JSON string safely
        if (res.data.questions) {
          try {
            const parsedQuestions = JSON.parse(res.data.questions);
            setQuestions(parsedQuestions);
          } catch {
            setQuestions([]);
          }
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch assessment:", err);
        alert("Failed to load assessment");
        navigate(-1);
      }
    };

    fetchAssessment();
  }, [assessmentId, navigate]);

  if (!assessment) return <p>Loading...</p>;

  return (
    <div className="container my-1 p-4 bg-white rounded shadow-sm">
      <h2 className="mb-4 text-primary">Assessment: {assessment.title}</h2>
      <p className="fs-5">
        <strong>Max Score:</strong> {assessment.maxScore}
      </p>

      <h4 className="mt-4 mb-3">Questions:</h4>
      {questions.length === 0 && (
        <p className="text-muted">No questions available.</p>
      )}

      <div className="list-group" style={{ paddingLeft: 0 }}>
        {questions.map((q, i) => (
          <li className="list-group-item mb-3 shadow-sm">
            <p className="fw-semibold fs-5 mb-2" style={{ display: "inline" }}>
              Question {i + 1}:{" "}
            </p>
            <span className="fs-5 fw-normal">{q.questionText}</span>

            <ul className="list-unstyled ms-3 mt-2 mb-2">
              {q.options.map((opt, idx) => (
                <li key={idx} className="mb-1" style={{ whiteSpace: "nowrap" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 20,
                      marginRight: 8,
                      fontWeight: "bold",
                      color: "#555",
                    }}
                  >
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </li>
              ))}
            </ul>
            <p className="mb-0">
              <strong>Correct Answer:</strong>{" "}
              <span className="text-success">{q.correctAnswer}</span>
            </p>
          </li>
        ))}
      </div>

      <button
        className="btn btn-outline-primary mt-4 rounded-pill"
        onClick={() => navigate(-1)}
      >
        ← Back to Assessments
      </button>
    </div>
  );
};

export default ViewAssessmentPage;
