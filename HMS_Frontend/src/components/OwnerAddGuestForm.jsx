import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { saveGuest, getGuestById, updateGuestById, } from '../services/GuestService';


const OwnerAddGuestForm = () => {
  const [guest, setGuest] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      fetchGuest();
    }
  }, [id]);

  const fetchGuest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getGuestById(id, token);
      const guestData = response.data;
      setGuest(guestData);
    } catch (error) {
      console.error('Error fetching guest:', error);
    }
  };

  const saveOrUpdateGuest = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      if (id) {
        await updateGuestById(id, guest, token);
        alert("update successful");
      } 
      
      else {
        await saveGuest(guest, token);
        alert('create Successful');
      }
      navigate('/listOfGuest');
      
    } catch (error) {
      console.error('Error saving/updating guest:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGuest({ ...guest, [name]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title mb-4">Add/Update Guest</h2>
              <form onSubmit={saveOrUpdateGuest}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" name="email" value={guest.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" name="name" value={guest.name} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone:</label>
                  <input type="text" name="phone" value={guest.phone} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address:</label>
                  <input type="text" name="address" value={guest.address} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <Link to="/listOfGuest" className="btn btn-secondary ms-2">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAddGuestForm;
