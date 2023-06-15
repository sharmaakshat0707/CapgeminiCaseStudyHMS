import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteGuestById, getAllGuests } from '../services/GuestService';
import { Button, ButtonGroup } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ListGuest = () => {
  const [guests, setGuests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGuests, setFilteredGuests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGuests = async () => {
      try {
        const response = await getAllGuests(token);
        setGuests(response.data);
        setFilteredGuests(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = guests.filter((guest) => {
      const guestName = guest.name.toLowerCase();
      const guestEmail = guest.email.toLowerCase();
      const query = searchQuery.toLowerCase();
      return guestName.includes(query) || guestEmail.includes(query);
    });
    setFilteredGuests(filtered);
  }, [searchQuery, guests]);

  const deleteGuest = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteGuestById(id, token);
      setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    const tableData = filteredGuests.map((guest) => [
      guest.id,
      guest.email,
      guest.name,
      guest.phone,
      guest.address
    ]);

    doc.setFontSize(12);
    doc.text('List Guests', 14, 15);

    doc.autoTable({
      head: [['Guest ID', 'Email', 'Name', 'Phone', 'Address']],
      body: tableData,
      startY: 20
    });

    doc.save('guests.pdf');
  };

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <div>
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
      <h2 className='text-center'>List Guests</h2>
      <div className='text-right'>
        <Link to='/ownerGuestList' className='btn btn-primary mb-2'>
          Add Guest
        </Link>
        <div style={{ display: "flex", padding: "10px 0" }}>
          <input
            type='search'
            placeholder='Search by guest name or email'
            onChange={handleSearch}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <button className='btn btn-primary' onClick={generatePdf}>
            Generate PDF
          </button>
        </div>
      </div>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Guest ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.id}</td>
              <td>{guest.email}</td>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.address}</td>
              <td>
              <Link className='btn btn-info' to={`/ownerEditGuest/${guest.id}`}>
                  Update
                </Link>
                <Button
                  color='danger'
                  onClick={() => deleteGuest(guest.id)} style={{marginLeft:'10px'}}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListGuest;
