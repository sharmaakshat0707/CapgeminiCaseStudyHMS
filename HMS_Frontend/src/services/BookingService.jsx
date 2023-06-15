import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update the base URL if needed

export const getAllBookings = async (token) => {
  return await axios.get(`${BASE_URL}/bookings/allBookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookingById = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}/bookings/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error getting booking by ID:', error);
    throw error;
  }
};

export const createBooking = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${BASE_URL}/bookings/bookingpost`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const deleteBookingById = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${BASE_URL}/bookings/${id}`, config);
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

export const updateBookingById = async (id, data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`${BASE_URL}/bookings/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};