import React, { useState } from 'react';
import "../css/About.css";
import Logo4 from "../assets/Logo/Logo4.png";
import Bhopal4 from "../assets/Bhopal/Bhopal4.jpg";
import Feedback from './Feedback';

const About = () => {

  const [roomCount, setRoomCount] = useState(0);

  const increaseRooms = () => {
    setRoomCount(roomCount + 1);
  };

  const decreaseRooms = () => {
    if (roomCount > 0) {
      setRoomCount(roomCount - 1);
    }
  };

  return (
    <div>
      <div className="content-head">
        <h3 style={{color:"darkgreen" , marginTop:"60px", marginLeft:"670px"}}>Welcome to</h3>
        <h3 style={{color:"darkgreen" , marginTop:"10px", marginLeft:"550px"}}>The Lemon Tree Hotel & Banquet</h3>

        <div className="content-mid">
          <div className="content-img">
            <img src={Bhopal4} alt="About" />
          </div>
          <div className="content-cont  about-cont">
            <p className="Para-about">
              Located In The Heart Of City, Lemon Tree Hotel, Bhopal Welcomes
              You With Cheery Greetings, A Friendly Smile And A Whiff Of The
              Signature
            </p>
            <p className="Para-about">
              Luxury, elegance, personalized service, and all the contemporary
              facilities are combined to provide an environmentally friendly
              hotel. Don't miss out on our offers. We guarantee you the best
              price for all our properties.
            </p>
            <p className="Para-about">
              Lemon Fragrance.Defined By Our Values And Is A Serene Experience
              That We Offer Our Guests, Who Seek To Enter A World Of Leisure And
              Rejuvenation.
            </p>
            <p className="Para-about">
              In The Edge Of A Green Forest Or The Palace That Speaks The Story
              Of Century-Old History, Our Beautiful Properties In Bhopal Will
              Astonish You With Exceptional Hospitality And Facilities.
            </p>
            <p className="Para-about">
              We look forward to having you visit our hotels and creating
              memories with us.
            </p>
          </div>
        </div>
      </div>
      <div className="aboutlower">
        <div className="aboutpanel">
          <div className="aboutext">
            <h3 style={{fontSize:"35px" , color:"darkgreen" , marginLeft:"45px"}}>Plan Your Special Stay With Us!</h3>
            <p style={{fontSize:"14px", marginTop:"20px"}}>We bring you spaces designed especially for modern India. We offer - Contemporary Banquet Hall Designs, Beautiful furnished Rooms Complimentary High-Speed Internet, Unique Culinary Experiences, and Service Delivery Assurance.We guarantee you the best price for all our properties.</p>
            <img src={Logo4} alt="" style={{height:"90px" , width:"90px", marginLeft:"490px", marginTop:"5px"}}/>
          </div>
          <div className="aboutimage">
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
