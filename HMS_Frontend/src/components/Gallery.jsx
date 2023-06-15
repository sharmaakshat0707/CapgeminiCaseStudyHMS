import React from "react";
import "../css/Gallery.css";

const Gallery = () => {
  return (
    <div>
      <div className="text">
        <h4 style={{color:"#1a8b46"}}>A WARM WELCOME AWAITS.</h4>
        <h5>.________________________.</h5>
        <p style={{fontSize:"16px"}}>Welcome to our hotel, a haven of comfort and hospitality nestled in a convenient location. As you enter our elegant lobby, you'll be greeted by a warm and inviting atmosphere that sets the tone for your stay. Our friendly and professional staff is dedicated to providing exceptional service, ensuring that your every need is met with a smile.</p>
        {/* <br/> */}
        <p style={{fontSize:"16px"}}>We are confident that our hotel is an ideal destination for your next
          corporate event. We focus on a comfortable, relaxing, and safe
          experience for anyone that walks through our hotel doors.</p>
        {/* <br/> */}
        <p style={{fontSize:"16px"}}>
          Hotel Lemon-Tree has sold more than 1000 room nights in the last 1
          years with an average of 80% occupancy and a customer satisfaction
          rate of 96.30% and over 500 positive reviews on Google. Our
          trajectory is very good at showcasing our commitment, unmatched
          customer service, and impeccable attention to detail.
        </p>
      </div>
      <div className="head">
        <h2>ROOMS</h2>
      </div>
      <div className="gallery">
        <div className="one">
            <div className="image">
                <img src="https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                
            </div>
            <div className="image">
                <img src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                
            </div>
            <div className="image">
                <img src="https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                
            </div>
        </div>
        <div className="two">
        <div className="image">
            <img src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            
        </div>
        <div className="image">
            <img src="https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            
        </div>
        <div className="image">
            <img src="https://images.pexels.com/photos/6970065/pexels-photo-6970065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            
        </div>
        </div>
      </div>
    </div>  
  );
};

export default Gallery;
