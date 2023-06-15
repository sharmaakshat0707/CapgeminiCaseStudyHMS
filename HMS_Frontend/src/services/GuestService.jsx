import axios from 'axios'

const VITE_GUEST_BASE_REST_API_URL = "http://localhost:8080/guest";

export const saveGuest = async (data,token) => {
    return await axios.post(`${VITE_GUEST_BASE_REST_API_URL}/guests`,data,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}


export const getAllGuests = async (token) => {
    return await axios.get(`${VITE_GUEST_BASE_REST_API_URL}/guests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  
  export const deleteGuestById = async (guestId, token) => {
    return await axios.delete(`${VITE_GUEST_BASE_REST_API_URL}/${guestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const updateGuestById = async (guestId, data, token) => {
    return await axios.put(`${VITE_GUEST_BASE_REST_API_URL}/${guestId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getGuestById = async (guestId, token) => {
    return await axios.get(`${VITE_GUEST_BASE_REST_API_URL}/${guestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  