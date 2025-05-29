import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;

export const getAvailableCourses = async () => {
  console.log("Fetching courses from:", `${API}/CourseModels`);
  const res = await axios.get(`${API}/CourseModels`);
  return res.data;
};

export const getEnrolledCourses = async (userId) => {
  const res = await axios.get(`${API}/EnrollmentModels/student/${userId}`);
  return res.data;
};

export const getPerformanceReports = async (userId) => {
  const res = await axios.get(`${API}/ResultModels/student/${userId}/results`);
  return res.data;
};

// export const getAvailableAssessments = async (userId) => {
//   const res = await axios.get(`${API}/AssessmentModels/${userId}`);
//   return res.data;
// };