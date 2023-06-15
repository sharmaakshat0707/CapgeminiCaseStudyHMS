import React from 'react'
import '../css/Content.css';
import Bhopal5 from '../assets/Bhopal/Bhopal5.jpg';

const Content = () => {
  return (
    <div>
      <div className="content-head">
        {/* <h1>WHAT'S NEW</h1> */}
        <div className="content-mid">
            <div className="content-img">
                <img src={Bhopal5} alt="" />
            </div>
            <div className="content-cont">
              <h2 style={{color:" darkGreen" ,fontSize:"30px" , marginLeft:"150px" , marginBottom:"40px"}}>Lemon-Tree, Bhopal - Luxury Hotel</h2>
                <p className='con-para'>Here's to the month of clear blue skies, summer breeze, long walks by the beaches, and a trek to the mountains, and we’ve got you covered for all!</p>
                <p className='con-para'>As you arrive through the Gate you can stop and breathe in the enchanting air that surrounds the resort . <br/>We are also pleased to announce our three new signings are placed in different regions in addition to our 1 and 2 operational hotels in the regions, respectively.</p>
                <p className='con-para'>If you are looking to stay at one of the top hotels in Bhopal, book a holiday with your family or your friends, our hotel deals and offers promise to give you the best value, provide you the best service, and make every experience with us unforgettable</p>
                <p className='con-para'>We look forward to having you visit our hotels and creating memories with us.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Content