import React from 'react'
import '../css/Services.css';
import Service1 from '../assets/Services/Service1.png';
import Service2 from '../assets/Services/Service2.png';
import Service3 from '../assets/Services/Service3.png';
import Service4 from '../assets/Services/Service4.png';
import Service5 from '../assets/Services/Service5.png';
import Service7 from '../assets/Services/Service7.png';

const Services = () => {
  return (
    <div>
      <h1 style={{marginLeft:"630px" , marginTop:"80px"}}>Services</h1>
      <div className="service-panel">
        <div className="service-one">
          <div className="service-box">
            <img src={Service1} alt="Food" />
            <div className="service-text">
              <h3>Catering</h3>
            </div>
            <div className="service-con">
              <p>Our hotel's exceptional catering service, where culinary expertise and personalized service combine to create memorable dining experiences</p>
            </div>
          </div>
          <div className="service-box">
            <img src={Service2} alt="" />
            <div className="service-text">
              <h3>Room Services</h3>
            </div>
            <div className="service-con">
              <p>Our room are designed to ensure a restful night's sleep. We provide comfortable mattresses, high-quality bedding to ensure optimal comfort.</p>
            </div>
            
          </div>
          <div className="service-box">
            <img src={Service3} alt="" />
            <div className="service-text">
              <h3>Pick & Drop</h3>
            </div>
            <div className="service-con">
              <p>Our hotel's premier taxi service, where convenience and reliability merge to provide you with a seamless transportation experience.</p>
            </div>
            
          </div>
        </div>
        <div className="service-two">
          <div className="service-box">
            <img src={Service4} alt="" className='service-img'/>
            <div className="service-text">
              <h3>Credit Card</h3>
            </div>
            <div className="service-con">
              <p>our hotel's convenient and secure credit card service, designed to streamline your payment experience and ensure a hassle-free stay.</p>
            </div>
            {/* <div className="service-but">
                <button className='but'>Explore</button>
            </div> */}
          </div>
          <div className="service-box">
            <img src={Service5} alt="" />
            <div className="service-text">
              <h3>Wifi Connectivity</h3>
            </div>
            <div className="service-con">
              <p>Our hotel provide a  high-speed and reliable internet service, designed to meet the connectivity needs of our valued guests.</p>
            </div>
            {/* <div className="service-but">
                <button className='but'>Explore</button>
            </div> */}
            
          </div>
          <div className="service-box">
            <img src={Service7} alt="" />
            <div className="service-text">
              <h3>Laundry</h3>
            </div>
            <div className="service-con">
              <p>Our hotel's convenient and reliable laundry service, designed to cater to your laundry needs and ensure that you have a comfortable and hassle-free stay.</p>
            </div>
            {/* <div className="service-but">
                <button className='but'>Explore</button>
            </div> */}

          </div>
            
            
          </div>
      </div>
    </div>
  )
}

export default Services
