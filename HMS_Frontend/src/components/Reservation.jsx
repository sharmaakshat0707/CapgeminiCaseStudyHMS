import React, { useState } from "react";
import "../css/Reservation.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBooking } from "../services/BookingService";
import { Button, UncontrolledCollapse, Card, CardBody } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Reservation = ({ room, checkInDate, checkOutDate, availableRooms }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    room1: {
      numChildren: "",
      numAdults: "",
      numNights: "",
      roomIds: [room?.roomId],
    },
    room2: {
      numChildren: "",
      numAdults: "",
      numNights: "",
      roomIds: [room?.roomId], // Assuming the same room ID for the second room
    },
  });

  const handleFormChange = (e, roomKey) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [roomKey]: {
        ...prevFormData[roomKey],
        [name]: value,
      },
    }));
  };

  const calculateNumNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate number of nights
      return numNights.toString(); // Convert to a string before returning
    }
    return "";
  };

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent form submission
    const room1Data = {
      ...formData.room1,
      numNights: calculateNumNights(),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    const room2Data = {
      ...formData.room2,
      numNights: calculateNumNights(),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    navigate("/payment", {
      state: {
        room1Data,
        room2Data,
        from: location.pathname,
      },
    });
  };

  return (
    <div className="booking">
      <ToastContainer />
      <div className="booking-img">
        {room && (
          <img src={`data:image/png;base64,${room?.image}`} alt="room" />
        )}
      </div>
      <div className="booking-con">
        <form onSubmit={handleBooking} style={{ marginBottom: "2px" }}>
          <div className="inputBox">
            <h3>No of Adults</h3>
            <input
              type="number"
              name="numAdults"
              placeholder="Number of Guests"
              onChange={(e) => handleFormChange(e, "room1")}
              value={formData.room1.numAdults}
              required
              max="3"
            />
          </div>
          <div className="inputBox">
            <h3>Number Of Children</h3>
            <input
              type="number"
              name="numChildren"
              placeholder="Number Of Children"
              onChange={(e) => handleFormChange(e, "room1")}
              value={formData.room1.numChildren}
              required
              max="3"
            />
          </div>
          <div className="inputBox">
            <h3>Number of Nights</h3>
            <input
              type="number"
              name="numNights"
              placeholder="Number Of Nights"
              onChange={(e) => handleFormChange(e, "room1")}
              value={calculateNumNights()}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn"
              style={{ marginLeft: "19px", marginTop: "30px" }}
            >
              Book Now
            </button>
            <Button
              color="primary"
              id="toggler"
              style={{ marginLeft: "200px", marginTop: "30px" }}
            >
              Add Another Room
            </Button>
            <UncontrolledCollapse toggler="#toggler">
              <Card style={{ marginTop: "15px" }}>
                <CardBody style={{ backgroundColor: "#83838361" }}>
                  <CardBody style={{ backgroundColor: "#83838361" }}>
                    <div className="inputBox">
                      <h3>Select Room</h3>
                      <select
                        name="room"
                        onChange={(e) =>
                          handleRoomSelection(e.target.value, "room2")
                        }
                        value={formData.room2.roomIds[0]}
                        required
                      >
                        <option value="">Select a room</option>
                        {availableRooms &&
                          availableRooms.map((room) => (
                            <option key={room.roomId} value={room.roomId}>
                              {room.roomType}
                            </option>
                          ))}
                      </select>
                    </div>
                  </CardBody>

                  <div className="inputBox">
                    <h3>No of Adults</h3>
                    <input
                      type="number"
                      name="numAdults"
                      placeholder="Number of Guests"
                      onChange={(e) => handleFormChange(e, "room2")}
                      value={formData.room2.numAdults}
                      required
                      max="2"
                    />
                  </div>
                  <div className="inputBox">
                    <h3>Number Of Children</h3>
                    <input
                      type="number"
                      name="numChildren"
                      placeholder="Number Of Children"
                      onChange={(e) => handleFormChange(e, "room2")}
                      value={formData.room2.numChildren}
                      required
                      max="2"
                    />
                  </div>
                  <div className="inputBox">
                    <h3>Number of Nights</h3>
                    <input
                      type="number"
                      name="numNights"
                      placeholder="Number Of Nights"
                      onChange={(e) => handleFormChange(e, "room2")}
                      value={calculateNumNights()}
                      required
                    />
                  </div>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
