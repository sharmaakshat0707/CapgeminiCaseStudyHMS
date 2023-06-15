import React from 'react'
import '../css/Wrapper.css';
import { NavLink } from 'react-router-dom'
import Wrapper1 from '../assets/Wrapper/Wrapper1.jpg';
import Wrapper2 from '../assets/Wrapper/Wrapper2.jpg';
import Wrapper3 from '../assets/Wrapper/Wrapper3.jpg';
import Wrapper4 from '../assets/Wrapper/Wrapper4.jpg';
import Bhopal6 from '../assets/Bhopal/Bhopal6.jpg';
import Bhopal8 from '../assets/Bhopal/Bhopal8.png';

const Wrapper = () => {
  return (
    <div>
      <h1 style={{marginLeft:"630px"}}>Rooms & View</h1>
      <div className="wrapper-panel">
        <div className="wrapper-bg">
          <div className="wrapper1">
            <img src={Wrapper1} alt=""/>
            <NavLink to="/gallerypage">
                <button className='wrapper-butt'>See Rooms</button>
            </NavLink>
          </div>
          <div className="wrapper2">
            <div className="wrapperone">
              <img src={Bhopal6} alt="" />
            </div>
            <div className="wrappertwo">
              <div className="wrapperwrap">
                 <img src={Wrapper3} alt="" />
              </div>
              <div className="wrapper">
                 <img src={Bhopal8} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper