import axios from "axios"

const VITE_ROOMS_BASE_REST_API_URL = "http://localhost:8080/rooms";

export const getAllRooms = async (token) => {
    return await axios.get(`${VITE_ROOMS_BASE_REST_API_URL}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },

    });
}

export const createRoom = async (data,token) => {
  console.log(data)
    return await axios.post(`${VITE_ROOMS_BASE_REST_API_URL}/roompost`,data,{
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
        
    });
}


export const updateRoomById = async (roomId, data, token) => {
    return await axios.put(`${VITE_ROOMS_BASE_REST_API_URL}/${roomId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
  };

  export const deleteRoomById = async (roomId, token) => {
    return await axios.delete(`${VITE_ROOMS_BASE_REST_API_URL}/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getRoomById = async (roomId,token) => {
    return await axios.get(`${VITE_ROOMS_BASE_REST_API_URL}/${roomId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          }, 
    });
  };

export const getAvailableRooms = async (data) => {
    return await axios.post(`${VITE_ROOMS_BASE_REST_API_URL}/checkAvailableRooms`,data);
}