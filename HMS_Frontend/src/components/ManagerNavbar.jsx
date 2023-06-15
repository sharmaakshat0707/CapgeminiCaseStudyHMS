import React from "react";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ManagerNavbar = () => {
  return (
    // <div id="Panel">
    //   <div classNameName="lo">
    //   </div>
    //   <div classNameName="inner">
    //     <NavLink to="/listRooms" classNameName="rooms">
    //       Rooms
    //     </NavLink>
    //     <NavLink to="/listStaff">
    //       Staff
    //     </NavLink>
    //   </div>
    //   </div>

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Manager DashBoard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                <NavLink to="/listRooms" className="rooms">
                  Rooms
                </NavLink>
              </a>
              <a className="nav-link"  href="#">
                <NavLink to="/listStaff">Staff</NavLink>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ManagerNavbar;

