import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../css/Home.css";
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
       <Carousel className="media-slide">
       <div className='one'>
                    <div className="home-overlay">
                        <div className="overlay-content">
                          <h6>JUST ENJOY & RELAX</h6>
                          <h1>YOUR LUXURY HOTEL <br/> FOR VACATION</h1>
                          <NavLink to="/gallery">
                             <button className='home-button'>See Our Rooms</button>
                          </NavLink>
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1623812058330-ccfa078cffb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"/>
                </div>
                <div>
                    <img src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 " />
                </div>
                <div>
                    <img src="https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"/>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"/>
                </div>
       </Carousel>
    </div>
  
  )
}

export default Home
