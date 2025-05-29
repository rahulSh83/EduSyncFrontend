import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/AssessmentModels';

export const createAssessment = async (assessmentData) => {
  const response = await axios.post(`${API_URL}`, assessmentData);
  return response.data;
};

export const getAssessmentsByCourse = async (courseId) => {
  const response = await axios.get(API_URL);
  return response.data.filter(a => a.courseId === courseId);
};
