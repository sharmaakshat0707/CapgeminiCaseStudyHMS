import React, { Component } from "react";
import '../css/SliderCompo.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Bhopal7 from '../assets/Bhopal/Bhopal7.png';


export default class SliderCompo extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // Enable automatic transitions
      autoplaySpeed: 1000,// Set the transition interval in milliseconds
    };
    return (
     <>
      <div className="slider-panel">
        <div className="slider-panel1">
          
        </div>
        <div className="slider-panel2" style={{ margin: 'auto', marginBottom: '10px', marginTop: '10px' ,padding:"50px 20px" ,marginLeft:'100px' }}>
        <Slider {...settings}>
          <div className="carousel1-banner">
            <img src={Bhopal7} alt=""/>
          </div>
          <div className="carousel1-banner">
            <img src='https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
          </div>
          <div className="carousel1-banner">
            <img src='https://images.pexels.com/photos/3201919/pexels-photo-3201919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" height="250px" width="1250px" />
          </div>
          <div className="carousel1-banner">
            <img src='https://images.pexels.com/photos/6480198/pexels-photo-6480198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" height="250px" width="1250px" />
          </div>
          <div className="carousel1-banner">
            <img src='https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" height="200px" width="1550px" />
          </div>
          <div className="carousel1-banner">
            <img src='https://images.pexels.com/photos/2612117/pexels-photo-2612117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" height="250px" width="1250px" />
          </div>
        </Slider>
      </div>
     </div>
    </>
    );
  }
}