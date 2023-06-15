import React from "react";
import "../css/Footer.css";
import Logo4 from "../assets/Logo/Logo4.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container grid2 foot">
        <div className="Footer-box ">
          <h1 className="Head">Lemon-Tree</h1>
          <p>
            Lemon Tree Hotel, Bhopal Welcomes You With Cheery Greetings, A
            Friendly Smile And A Whiff Of The Signature
          </p>
          <p>
            For those seeking relaxation, our hotel offers a range of leisure
            facilities to help you unwind.{" "}
          </p>
        </div>

        <div className="Footer-box">
          <h1 className="Head">Highlights</h1>
          <ul>
            <li>Prime Location</li>
            <li>Diverse Cuisines</li>
            <li>Professional Staffs</li>
            <li>24/7 Reception</li>
            <li>Complimentry Services</li>
          </ul>
        </div>
        {/* <div className='Footer-box'>
                    <h1 className="Head">Customer Care</h1>
                    <ul>
                        <li>Help Center </li>
                        <li>How to Book </li>
                        <li>Professional Staffs</li>
                        <li>24/7 Reception</li>
                        <li>Complimentry Services</li>
                    </ul>
                </div> */}
        <div className="Footer-box">
          <h1 className="Head">Contact Us</h1>
          <ul>
            <li>Near Hotel Surendra Vilas, Bhopal</li>
            <li>Email: hotellemontree2@gmail.com</li>
            <li>Mob : +91 7849999054</li>
          </ul>
        </div>
        <div className="Footer-box">
          <h1 className="Head">Our Brands</h1>
          <ul>
            {/* <li>Lemon-Tree</li> */}
            <div
              className="brand-logo"
              style={{ width: "180px", height: "130px" }}
            >
              <img
                src={Logo4}
                alt=""
                style={{ marginTop: "-70px",height:"180px" ,width:"180px" , paddingRight: "5px" }}
              />
            </div>
          </ul>
        </div>
      </div>
      <p style={{ marginLeft: "690px" }}>Follow Us On</p>
      <div style={{ marginLeft: "650px", fontSize: "30px" }}>
        <a
          href="https://www.facebook.com/lemontreehotelsltd/"
          style={{ color: "white", marginRight: "20px" }}
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/lemontreehotels/?hl=en"
          style={{ color: "white", marginRight: "20px" }}
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/LemonTreeHotels?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          style={{ color: "white", marginRight: "20px" }}
        >
          <FaTwitterSquare />
        </a>
        <a
          href="https://www.linkedin.com"
          style={{ color: "white", marginRight: "20px" }}
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;