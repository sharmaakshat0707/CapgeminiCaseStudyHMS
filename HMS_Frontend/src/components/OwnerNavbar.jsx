import React from "react";
import Logo4 from "../assets/Logo/Logo4.png";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const OwnerNavbar = ({ isLoggedIn, setIsLoggedIn, setBookingRoomIds }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setBookingRoomIds([]);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/user/dashboard", {
      state: {
        isLoggedIn: true,
        role: "USER",
      },
    });
  };

  const role = localStorage.getItem("role");

  const handleBookNow = () => {
    if (isLoggedIn) {
      navigate("/available");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{ marginLeft: "50px" }}>
          <a className="navbar-brand" href="#" style={{ color: "dark-green" }}>
            Owner DashBoard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
            style={{ padding: "1px 250px" }}
          >
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                <NavLink
                  to="/listGuests"
                  className="Guests"
                  style={{
                    paddingLeft: "50px",
                    color: "black",
                    textDecoration: "None",
                  }}
                >
                  Guests
                </NavLink>
              </a>
              <a className="nav-link" href="#">
                <NavLink
                  to="/listBookings"
                  style={{
                    paddingLeft: "50px",
                    color: "black",
                    textDecoration: "None",
                  }}
                >
                  Bookings
                </NavLink>
              </a>
              <a className="nav-link" href="#">
                <NavLink
                  to="/listStaff"
                  style={{
                    paddingLeft: "50px",
                    color: "black",
                    textDecoration: "None",
                  }}
                >
                  Staffs
                </NavLink>
              </a>
              <a className="nav-link" href="#">
                <NavLink
                  to="/listRooms"
                  style={{
                    paddingLeft: "50px",
                    color: "black",
                    textDecoration: "None",
                  }}
                >
                  Rooms
                </NavLink>
              </a>
            </div>
          </div>
        </div>
        <div className="logo">
          <div className="dropdown">
            <a
              className="btn btn-secondary dropdown-toggle nav-but"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle
                style={{
                  width: "55px",
                  height: "28px",
                  color: "#565454",
                }}
              />
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ color: "black" }}
            >
              {isLoggedIn ? (
                <>
                  <li className="dropdown-item" onClick={handleProfile}>
                    Profile
                  </li>
                  <li className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              ) : (
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none" }}
                >
                  <li className="dropdown-item">Login/Signup</li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default OwnerNavbar;
