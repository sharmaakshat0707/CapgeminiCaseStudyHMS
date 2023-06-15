import React, { useState, useEffect } from 'react';

import { getAllBookings, deleteBookingById } from '../services/BookingService';



const ListUserComponent = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const response = await getAllBookings(token);
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching bookings:', error);
        }
      }
    };

    if (token) {
      fetchBookings();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const deleteBooking = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await deleteBookingById(id, token);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>List Bookings</h2>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Booking numChildren</th>
            <th>Booking numAdults</th>
            <th>Booking checkInDate</th>
            <th>Booking checkOutDate</th>
            {/* <th>Booking numNights</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.bookingId}</td>
              <td>{booking.numChildren}</td>
              <td>{booking.numAdults}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              {/* <td>{booking.numNights}</td> */}
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteBooking(booking.bookingId)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserComponent;