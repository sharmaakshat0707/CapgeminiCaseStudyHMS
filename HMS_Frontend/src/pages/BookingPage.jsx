import React, { useEffect, useState } from 'react'
import Reservation from '../components/Reservation';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router';
import ReservationPage from '../components/ReservationPage';
import Payment from '../components/Payment';

const BookingPage = ({ bookingRoomIds, setBookingRoomIds }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [room, setRoom] = useState(location.state?.data);

  useEffect(()=>{
    if(location.state?.from!=='/image-slider'){
      navigate('/available')
    }
  },[])

  return (
    <div>
      <Payment room={room} numAdults={location.state?.numAdults} numChildren={location.state?.numChildren} numNights={location.state?.numNights} checkInDate={location.state?.checkInDate} 
          checkOutDate={location.state?.checkOutDate} bookingRoomIds={bookingRoomIds} setBookingRoomIds={setBookingRoomIds} />
      <Footer/>
    </div>
  )
}

export default BookingPage