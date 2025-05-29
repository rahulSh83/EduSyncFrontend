import axios from 'axios';

const RESULT_URL = process.env.REACT_APP_API_BASE_URL + '/ResultModels';

export const submitResult = async (resultData) => {
  const response = await axios.post(RESULT_URL, resultData);
  return response.data;
};

export const getAssessments = async () => {
  // For simplicity, get all assessments; later can filter by course/student
  const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/AssessmentModels');
  return response.data;
};

export const getResultByUserAndAssessment = async (userId, assessmentId) => {
    // You might need to implement filtering in backend or client-side filtering
    const response = await axios.get(`${RESULT_URL}?userId=${userId}&assessmentId=${assessmentId}`);
    return response.data;
};

export const getResultsByAssessmentId = async (assessmentId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/ResultModels?assessmentId=${assessmentId}`
  );
  return response.data;
};
