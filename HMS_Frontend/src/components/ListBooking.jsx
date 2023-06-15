import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, deleteBookingById } from '../services/BookingService';
import { Button, ButtonGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ListBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [pdfContent, setPdfContent] = useState('');

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
      generatePdfContent();
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
  
    try {
      await deleteBookingById(id, token);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== id));
      setFilteredBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== id));
      Swal.fire('Booking Deleted', 'The booking has been successfully deleted.', 'success');
    } catch (error) {
      console.error('Error deleting booking:', error);
      Swal.fire('Error', 'An error occurred while deleting the booking.', 'error');
    }
  };
  

  const generatePdfContent = () => {
    let content = '';
    filteredBookings.forEach((booking) => {
      content += `Booking ID: ${booking.bookingId}\n`;
      content += `Num Children: ${booking.numChildren}\n`;
      content += `Num Adults: ${booking.numAdults}\n`;
      content += `Check-In Date: ${booking.checkInDate}\n`;
      content += `Check-Out Date: ${booking.checkOutDate}\n`;
      content += `Guest Name: ${booking.guest.length > 0 ? booking.guest[0].name : '-'}\n`;
      content += `Room ID: ${booking.rooms.length > 0 ? booking.rooms[0].roomId : '-'}\n`;
      content += '\n'; // Add a line break between bookings
    });
    setPdfContent(content);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
  
    const tableData = filteredBookings.map((booking) => [
      booking.bookingId,
      booking.numChildren,
      booking.numAdults,
      booking.checkInDate,
      booking.checkOutDate,
      booking.guest.length > 0 ? booking.guest[0].name : '-',
      booking.rooms.length > 0 ? booking.rooms[0].roomId : '-'
    ]);

    doc.setFontSize(12);
  doc.text('List Bookings', 14, 15);
  
    doc.autoTable({
      head: [['Booking ID', 'Num Children', 'Num Adults', 'Check-In Date', 'Check-Out Date', 'Guest Name', 'Room ID']],
      body: tableData,
      startY: 40
    });
  
    doc.save('bookings.pdf');
  };
  

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <div >
        <ButtonGroup>
          <Button tag={Link} to="/owner/dashboard">
            Home
          </Button>
          <Button tag={Link} to="/listOfRoom">
            Rooms
          </Button>
          <Button tag={Link} to="/listOfBooking">
            Bookings
          </Button>
          <Button tag={Link} to="/listOfStaff">
            Staff
          </Button>
          <Button tag={Link} to="/listOfGuest">
            Guest
          </Button>
        </ButtonGroup>
      </div>
      <h2 className='text-center'>List Bookings</h2>

      <div style={{ display: "flex", padding: "30px 10px" }}>
        <input type='Search' placeholder='Search by guest name' onChange={handleSearch} style={{ width: "840px", backgroundColor: "lightgray" }} />
        <button onClick={searchBookings} className="btn btn-primary" style={{ padding: "1px 30px" }}>Search</button>
      </div>

      <Link to='/add-booking' className='btn btn-primary mb-2'>
        Add Booking
      </Link>
      <button className='btn btn-primary' onClick={generatePdf}>
        Generate PDF
      </button>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Booking numChildren</th>
            <th>Booking numAdults</th>
            <th>Booking checkInDate</th>
            <th>Booking checkOutDate</th>
            {/* <th>Booking numNights</th> */}
            <th>Guest Name</th>
            <th>Room id</th>
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
              <td>{booking.guest.length > 0 ? booking.guest[0].name : '-'}</td>
              <td>{booking.rooms.length > 0 ? booking.rooms[0].roomId : '-'}</td>
              <td>
                <Link className='btn btn-info' to={`/OwnerEditBooking/${booking.bookingId}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: 'You are about to delete this booking.',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Delete',
                      cancelButtonText: 'Cancel',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteBooking(booking.bookingId);
                      }
                    });
                  }}
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

export default ListBooking;
