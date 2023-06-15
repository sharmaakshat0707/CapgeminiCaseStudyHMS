import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createRoom, getRoomById, updateRoomById } from '../services/RoomService';

const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [price, setPrice] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [image, setImage] = useState(null);
  const [roomDescriptionError, setRoomDescriptionError] = useState('');
  const [maxCapacityError, setMaxCapacityError] = useState('');

  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getRoomById(roomId, token);
      const roomData = response.data;
      setRoomNumber(roomData.roomNumber);
      setRoomType(roomData.roomType);
      setPrice(roomData.price);
      setMaxCapacity(roomData.maxCapacity);
      setRoomDescription(roomData.roomDescription);
      setImage(roomData.image);
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  const saveRoom = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const roomData = { roomNumber, roomType, price, maxCapacity, roomDescription, image };

    try {
      if (roomId) {
        await updateRoomById(roomId, roomData, token);
        alert('Update successful');
      } else {
        await createRoom(roomData, token);
        alert('Room added successfully');
      }
      navigate('/listRooms');
    } catch (error) {
      console.error('Error saving/updating room:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleRoomDescriptionChange = (e) => {
    const description = e.target.value;
    setRoomDescription(description);

    if (description.split(' ').length > 40) {
      setRoomDescriptionError('Room description should be less than 40 words');
    } else {
      setRoomDescriptionError('');
    }
  };

  const handleMaxCapacityChange = (e) => {
    const capacity = e.target.value;
    setMaxCapacity(capacity);

    if (capacity > 6) {
      setMaxCapacityError('Max capacity limit exceeded');
    } else {
      setMaxCapacityError('');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title mb-4">{roomId ? 'Update Room' : 'Add Room'}</h2>
              <form onSubmit={saveRoom}>
                <div className="mb-3">
                  <label htmlFor="roomNumber" className="form-label">
                    Room Number:
                  </label>
                  <input
                    type="number"
                    name="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label">
                    Room Type:
                  </label>
                  <select
                    name="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="Single">SINGLE</option>
                    <option value="Suite">SUITE</option>
                    <option value="Deluxe">DELUXE</option>
                    <option value="Superior">SUPERIOR</option>
                    <option value="Double Deluxe">DOUBLE DELUXE</option>
                    <option value="Presidential">PRESIDENTIAL SUITE</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="roomDescription" className="form-label">
                    Room Description:
                  </label>
                  <input
                    type="text"
                    name="roomDescription"
                    value={roomDescription}
                    onChange={handleRoomDescriptionChange}
                    className={`form-control ${roomDescriptionError ? 'is-invalid' : ''}`}
                    required
                  />
                  {roomDescriptionError && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {roomDescriptionError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="maxCapacity" className="form-label">
                    Max Capacity:
                  </label>
                  <input
                    type="text"
                    name="maxCapacity"
                    value={maxCapacity}
                    onChange={handleMaxCapacityChange}
                    className={`form-control ${maxCapacityError ? 'is-invalid' : ''}`}
                    required
                  />
                  {maxCapacityError && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {maxCapacityError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image:
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <Link to="/listRooms" className="btn btn-secondary ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomForm;
