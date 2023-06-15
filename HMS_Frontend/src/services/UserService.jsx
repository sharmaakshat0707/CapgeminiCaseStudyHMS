import axios from 'axios'

const VITE_USER_BASE_REST_API_URL = "http://localhost:8080/users";

export const authenticate = async (data) => {
    return await axios.post(`${VITE_USER_BASE_REST_API_URL}/authenticate`,data);
}

export const register = async (data) => {
    return await axios.post(`${VITE_USER_BASE_REST_API_URL}/register`,data);
}

export const getAllUsers = async (token) => {
    return await axios.get(VITE_USER_BASE_REST_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };