import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, deleteBookingById } from '../services/BookingService';
import { Button, ButtonGroup } from 'reactstrap';
import Swal from 'sweetalert2';

const ListBookingComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const response = await getAllBookings(token);
        setBookings(response.data);
        setFilteredBookings(response.data);
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


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchBookings = () => {
    const filtered = bookings.filter((booking) => {
      const guestName = booking.guest.length > 0 ? booking.guest[0].name : '';
      return guestName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredBookings(filtered);
  };
  const deleteBooking = async (id) => {
    const token = localStorage.getItem('token');
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this booking.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBookingById(id, token);
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.bookingId !== id)
          );
          setFilteredBookings((prevFilteredBookings) =>
            prevFilteredBookings.filter((booking) => booking.bookingId !== id)
          );
          Swal.fire('Deleted!', 'The booking has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting booking:', error);
          Swal.fire('Error!', 'An error occurred while deleting the booking.', 'error');
        }
      }
    });
  };
  

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <div>
        <ButtonGroup>
          <Button tag={Link} to='/receptionist/dashboard'>
            Home
          </Button>
          <Button tag={Link} to='/listBookings'>
            Bookings
          </Button>
          <Button tag={Link} to='/listGuests'>
            Guest
          </Button>
        </ButtonGroup>
      </div>
      
      <h2 className='text-center'>List Bookings</h2>
      <div style={{display:"flex" , padding:"30px 10px"}}>
        <input type='Search' placeholder='Search by guest name' onChange={handleSearch} style={{width:"840px" , backgroundColor:"lightgray"}}/>
        <button onClick={searchBookings} className="btn btn-primary" style={{padding:"1px 30px"}}>Search</button>
      </div>
      <Link to='/add-booking' className='btn btn-primary mb-2'>
        Add Booking
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Booking numChildren</th>
            <th>Booking numAdults</th>
            <th>Booking checkInDate</th>
            <th>Booking checkOutDate</th>
            {/* <th>Booking numNights</th> */}
            <th>Room id</th>
            <th>Guest Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.bookingId}</td>
              <td>{booking.numChildren}</td>
              <td>{booking.numAdults}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              {/* <td>{booking.numNights}</td> */}
              <td>{booking.rooms.length > 0 ? booking.rooms[0].roomId : '-'}</td>
              <td>{booking.guest.length > 0 ? booking.guest[0].name : '-'}</td>
              <td>
                <Link className='btn btn-info' to={`/editBooking/${booking.bookingId}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteBooking(booking.bookingId)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookingComponent;