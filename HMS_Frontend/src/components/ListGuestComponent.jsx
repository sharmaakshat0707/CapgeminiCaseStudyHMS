import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteGuestById, getAllGuests } from '../services/GuestService';
import { Button, ButtonGroup } from 'reactstrap';
import Swal from 'sweetalert2';

const ListGuestComponent = () => {
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

  const searchGuests = () => {
    const filtered = guests.filter((guest) => {
      const guestName = guest.name || ''; // Use guest.name directly
      return guestName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredGuests(filtered);
  };

  const deleteGuest = async (id) => {
    const token = localStorage.getItem('token');
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this guest.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGuestById(id, token);
          setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
          setFilteredGuests((prevFilteredGuests) =>
            prevFilteredGuests.filter((guest) => guest.id !== id)
          );
          Swal.fire('Deleted!', 'The guest has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting guest:', error);
          Swal.fire('Error!', 'An error occurred while deleting the guest.', 'error');
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
      <h2 className='text-center'>List Guests</h2>
      <div style={{display:"flex" , padding:"30px 10px"}}>
        <input type='Search' placeholder='Search by guest name' onChange={handleSearch} style={{width:"840px" , backgroundColor:"lightgray"}}/>
        <button onClick={searchGuests} className="btn btn-primary" style={{padding:"1px 30px"}}>Search</button>
      </div>
      <Link to='/addGuest' className='btn btn-primary mb-2'>
        Add Guest
      </Link>
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
                <Link className='btn btn-info' to={`/editGuest/${guest.id}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteGuest(guest.id)}
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

export default ListGuestComponent;