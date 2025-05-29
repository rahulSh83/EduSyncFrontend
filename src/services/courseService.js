import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/CourseModels`);
  return response.data;
};

export const createCourse = async (courseData) => {
    const response = await axios.post(`${API_URL}/CourseModels`, courseData);
    return response.data;
};