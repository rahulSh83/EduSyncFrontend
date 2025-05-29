import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/UserModels';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
