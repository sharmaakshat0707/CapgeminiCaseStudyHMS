import React, { useEffect, useState } from 'react';
import '../css/Reservation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getAvailableRooms } from '../services/RoomService';

const ReservationPage = ({ room, checkInDate, checkOutDate, bookingRoomIds, setBookingRoomIds }) => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true)

  useEffect(()=>{
    console.log(room?.roomId)
    setBookingRoomIds([...bookingRoomIds,room?.roomId])
  },[])

  useEffect(()=>{
    setData({...data,roomIds:bookingRoomIds})
  },[bookingRoomIds])

  const [data, setData] = useState({
    numChildren: '',
    numAdults: '',
    numNights: '',
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    roomIds: bookingRoomIds
  });

  const handleChange = (e) => {

    if (e.target.name === 'numAdults' && parseInt(e.target.value) > 2*data.roomIds.length) {
      setDisable(false);
      toast.info("Please add More rooms!!", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } else if (e.target.name === 'numChildren' && parseInt(e.target.value) > 1*data.roomIds.length) {
      setDisable(false);
      toast.info("Please add More rooms!!", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setDisable(true);
    }
  };

  const calculateNumNights = () => {
    if (data.checkInDate && data.checkOutDate) {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate number of nights
      return numNights.toString(); // Convert to a string before returning
    }
    return '';
  };

  const handleBooking = () => {
    const numNights = calculateNumNights();
    setData({ ...data, numNights });

    navigate('/payment', {
      state: {
        data,
        from: '/reservation'
      }
    });
  };

  const addMoreRoom = () => {
    getAvailableRooms({
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate
    }).then(async (res) => {
      console.log(res.data)
      console.log(data.roomIds);
      res.data = await res.data.filter((result) => !data.roomIds.includes(result.roomId));
      console.log(res.data);
      navigate('/image-slider', {
        state: {
          from: '/reservation',
          data: await res.data,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className="booking">
        <ToastContainer />
        <div className="booking-img">
          {room && <img src={`data:image/png;base64,${room?.image}`} alt="room" />}
        </div>
        <div className="booking-con">
          <div>
            <div className="inputBox">
              <h3>No of Adults</h3>
              <input
                type="number"
                name="numAdults"
                placeholder="Number of Guests"
                onChange={handleChange}
                value={data.numAdults}
                min={1}
                required
              />
            </div>
            <div className="inputBox">
              <h3>Number Of Children</h3>
              <input
                type="number"
                name="numChildren"
                placeholder="Number Of Children"
                onChange={handleChange}
                value={data.numChildren}
                min={0}
                required
              />
            </div>
            <div className="inputBox">
              <h3>Number of Nights</h3>
              <input
                type="text" // Change input type to 'text' to display the calculated numNights
                name="numNights"
                placeholder="Number Of Nights"
                value={calculateNumNights()} // Use calculateNumNights() to display the calculated value
                readOnly // Make the input read-only
                required
              />
            </div>
            <button type="button" onClick={addMoreRoom} className="btn" disabled={disable}>
              Add More Rooms
            </button>
            <button type="button" onClick={handleBooking} className="btn" disabled={!disable}>
              BOOK NOW
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReservationPage;