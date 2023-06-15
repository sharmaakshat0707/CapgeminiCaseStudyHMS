import axios from "axios";

const VITE_BOOKING_BASE_REST_API_URL = "http://localhost:8080/staff";

export const getAllStaffs = async (token) => {
    return await axios.get(`${VITE_BOOKING_BASE_REST_API_URL}/allStaff`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  };

  export const createStaff = async (staff, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`${VITE_BOOKING_BASE_REST_API_URL}/postStaff`, staff, config);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error creating staff:', error);
      throw error;
    }
  };

  export const updateStaffById = async (id,staff, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(`${VITE_BOOKING_BASE_REST_API_URL}/${id}`,staff, config);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error getting staff by ID:', error);
      throw error;
    }
  };


  export const getStaffById = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(`${VITE_BOOKING_BASE_REST_API_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error getting staff by ID:', error);
      throw error;
    }
  };

  export const deleteStaffById = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.delete(`${VITE_BOOKING_BASE_REST_API_URL}/${id}`, config);
      return;
    } catch (error) {
      // Handle error
      console.error('Error deleting staff by ID:', error);
      throw error;
    }
  };