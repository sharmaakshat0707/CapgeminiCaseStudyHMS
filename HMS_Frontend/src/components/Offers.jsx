import React from 'react'
import Logo4 from '../assets/Logo/Logo4.png';
import Offers1 from '../assets/Promotion/Offers2.mp4';
import '../css/Offers.css';

const Offers = () => {
  return (
    <div>
      <div className="aboutlower">
        <div className="aboutpanel">
          <div className="aboutext" style={{position:"relative"}}>
            <h3 style={{fontSize:"35px" , color:"darkgreen" , marginLeft:"10px"}}>Exciting Offer Await You at Our Hotel!</h3>
            <p style={{fontSize:"14px", marginTop:"20px" , marginLeft:"30px"}}>Escape the ordinary and indulge in an unforgettable stay at our exquisite hotel. We are delighted to present you with our "Summer Gateway" offer  that will enhance your experience by provinding 20% off on any booking.The offer is valid for bookings made between 1st June 2023 till 31th July, 2023.</p>
            <p style={{marginLeft: "180px", color: "darkgreen"}}>
                <span className="bookNow">Come, Stay and Enjoy Your Day!</span>
            </p>
            <img src={Logo4} alt="" style={{height:"90px" , width:"90px", marginLeft:"490px", marginTop:"5px"}}/>
          </div>
          <div className="aboutVideo" style={{}}>
            <video width="100%" height="100%" controls controlsList="nodownload , nofullscreen" style={{height:"690px" , width:"690px", marginLeft:"0px"}}>
                <source src={Offers1} type="video/mp4"/>       
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers
