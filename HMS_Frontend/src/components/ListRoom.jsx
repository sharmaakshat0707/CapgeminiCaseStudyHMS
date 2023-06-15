import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteRoomById, getAllRooms } from '../services/RoomService';
import { Button, ButtonGroup } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRooms = async () => {
      try {
        const response = await getAllRooms(token);
        setRooms(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching rooms:', error);
        }
      }
    };

    if (token) {
      fetchRooms();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const deleteRoom = async (roomId) => {
    const token = localStorage.getItem('token');

    try {
      await deleteRoomById(roomId, token);
      setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    const tableData = rooms.map((room) => [
      room.roomId,
      room.roomNumber,
      room.roomType,
      room.price,
      room.maxCapacity
    ]);

    doc.setFontSize(12);
    doc.text('List Rooms', 14, 15);

    doc.autoTable({
      head: [['Room ID', 'Room Number', 'Room Type', 'Price', 'Max Capacity']],
      body: tableData,
      startY: 20
    });

    doc.save('rooms.pdf');
  };

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <div style={{marginTop:"10px"}}>
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
      <h2 className='text-center'>List Rooms</h2>
      <div className='text-right'>
      <Link to='/ownerRoomList' className='btn btn-primary mb-2'>
        Add Rooms
      </Link>
        <button className='btn btn-primary' onClick={generatePdf}>
          Generate PDF
        </button>
      </div>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Max Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.price}</td>
              <td>{room.maxCapacity}</td>
              <td>
                <Link className='btn btn-info' to={`/editRoom/${room.roomId}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteRoom(room.roomId)}
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

export default ListRoom;
