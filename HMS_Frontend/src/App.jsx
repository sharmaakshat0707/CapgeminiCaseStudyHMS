import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Reservation from './components/Reservation'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'
import ImageSlider from './components/ImageSlider'
import Available from './components/Available'
import Registration from './components/Registration'
import BookingPage from './pages/BookingPage'
import AdminNavbar from './components/AdminNavbar'
import UserDashboard from './components/UserDashboard'
import Wrapper from './components/Wrapper'
import Gallery from './components/Gallery'
import ServicePage from './pages/ServicePage'
import AddBookingComponent from './components/AddBookingComponent'
import ReceptionistDashboard from './components/ReceptionistDashboard'
import OwnerDashboard from './components/OwnerDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import ListRoomComponent from './components/ListRoomComponent'
import ListStaffComponent from './components/ListStaffComponent'
import AddStaffForm from './components/AddStaffForm'
import AddBookingForm from './components/AddBookingForm'
import ListBookingComponent from './components/ListBookingComponent'
// import AddRoomForm from './components/AddRoomForm'
import BillingPage from './pages/BillingPage'
import Payment from './components/Payment'
import AddRoomForm from './components/AddRoomForm'
import ListGuestComponent from './components/ListGuestComponent'
import AddGuestForm from './components/AddGuestForm'
import CreditCardForm from './components/CreditCardForm'
import ListStaff from './components/ListStaff'
import ListGuest from './components/ListGuest'
import ListBooking from './components/ListBooking'
import ListRoom from './components/ListRoom'
import ListUserComponent from './components/ListUserComponent'
import Feedback from './components/Feedback'
import BackToTop from './components/BackToTop'
import ScrollToBottom from './components/ScrollToBottom'
import OwnerAddGuestForm from './components/OwnerAddGuestForm'
import OwnerAddBookingForm from './components/OwnerAddBookingForm'
import OwnerAddRoomForm from './components/OwnerAddRoomForm'
import OwnerAddStaffForm from './components/OwnerAddStaffForm'


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookingRoomIds, setBookingRoomIds] = useState([])

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setBookingRoomIds={setBookingRoomIds}/>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/services" element={<ServicePage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/available" element={<Available/>} />
        <Route path="/booking-page" element={<BookingPage bookingRoomIds={bookingRoomIds} setBookingRoomIds={setBookingRoomIds}/>} />
        <Route path="/image-slider" element={<ImageSlider />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/user/dashboard" element={<UserDashboard/>} />
        <Route path="/gallerypage" element={<Gallery/>} />
        <Route path ="/add-booking" element={<AddBookingComponent/>}/>
        <Route path="receptionist/dashboard" element={<ReceptionistDashboard/>}/>
        <Route path="owner/dashboard" element={<OwnerDashboard/>}/>
        <Route path="manager/dashboard" element={<ManagerDashboard/>}/>
        <Route path="/listRooms" element={<ListRoomComponent/>}/>
        <Route path="/listStaff" element={<ListStaffComponent/>}/>
        <Route path= "/add-Staff" element={<AddStaffForm/>}/>
        <Route path="/editStaff/:id" element={<AddStaffForm/>}/>
        <Route path="/editBooking/:bookingId" element={<AddBookingForm/>}/>
        <Route path="/listBookings" element={<ListBookingComponent/>}/>
        <Route path="/listGuests" element={<ListGuestComponent/>}/>
        <Route path="/addGuest" element={<AddGuestForm/>}/>
        <Route path="/editGuest/:id" element={<AddGuestForm/>}/>
        <Route path="/editRoom/:roomId" element={<AddRoomForm/>}/>
        <Route path="/addRoom" element={<AddRoomForm/>}/>
        <Route path="/addRoom" element={<AddRoomForm/>}/>
        <Route path="/addRoom/:roomId" element={<AddRoomForm/>}/>
         <Route path="/billingpage" element={<BillingPage/>}/>
        <Route path="/payment" element={<Payment/>}/> 
        <Route path="/creditcard" element={<CreditCardForm/>}/>
        <Route path="/listOfStaff" element={<ListStaff/>}/>
        <Route path="/listOfGuest" element={<ListGuest/>}/>
        <Route path="/listOfBooking" element={<ListBooking/>}/>
        <Route path="/listOfRoom" element={<ListRoom/>}/>
        <Route path="/userBookings" element={<ListUserComponent/>}/>
        {/* <Route path="/payment" element={<Payment/>}/> */}
        <Route path="/rating" element={<Feedback/>}/>
        <Route path="/ownerGuestList" element={<OwnerAddGuestForm/>}/>
        <Route path="/ownerEditGuest/:id" element={<OwnerAddGuestForm/>}/>
        <Route path="/ownerEditBooking/:bookingId" element={<OwnerAddBookingForm/>}/>
        <Route path="/ownerRoomList" element={<OwnerAddRoomForm/>}/>
        <Route path="/ownerEditRoom/:roomId" element={<OwnerAddRoomForm/>}/>
        <Route path="/ownerStaffList" element={<OwnerAddStaffForm/>}/>
        <Route path="/ownerEditStaff/:id" element={<OwnerAddStaffForm/>}/>
      </Routes>
      <BackToTop/>
      {/* <ScrollToBottom/> */}
    </div>
  )
}

export default App