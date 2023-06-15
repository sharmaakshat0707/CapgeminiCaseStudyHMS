import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import ListBookingComponent from './ListBookingComponent'
import Receptionist from './Receptionist'
import ReceptionistNavbar from './ReceptionistNavbar'

export default function ReceptionistDashboard() {
  return (
    <div>
      <div>
      <ButtonGroup style={{marginTop:"100px"}}>
        <Button tag={Link} to="/listBookings">
          Bookings
        </Button>
        <Button tag={Link} to="/listGuests">
          Guest
        </Button>
      </ButtonGroup>
    </div>      
    </div>
  )
}
