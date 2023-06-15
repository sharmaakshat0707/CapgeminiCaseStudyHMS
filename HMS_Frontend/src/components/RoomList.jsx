import React, { useEffect, useState } from 'react';
import "../css/RoomList.css"

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from the backend
    fetch('http://localhost:8080/rooms/available')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Group rooms by their room type
  const groupedRooms = rooms.reduce((acc, room) => {
    if (acc[room.roomType]) {
      acc[room.roomType].push(room);
    } else {
      acc[room.roomType] = [room];
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <h2 className="mt-4">Available Rooms</h2>
      <div className="room-list">
       {Object.entries(groupedRooms).map(([roomType, roomsOfType]) => (
        <div key={roomType}>
          <h3>{roomType}</h3>
          <div className="row">
            {roomsOfType.map(room => (
              <div key={room.id} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Room: {room.roomNumber}</h3>
                    <p className="card-text">Max Capacity: {room.maxCapacity}</p>
                    <p className="card-text">
                      Availability: {room.available ? 'Available' : 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
       </div>
    </div>
  );
};

export default RoomList;
