import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/UserModels';

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    passwordHash: password,
  });
  return res.data;
};

export const registerUser = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};
