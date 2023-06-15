import React, { useEffect, useState } from "react";
import Logo4 from "../assets/Logo/Logo4.png";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn, setBookingRoomIds }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
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

  const renderOwnerDashboardHeading = () => {
    if (isLoggedIn && role === "OWNER") {
      return <h2 className="dashboard-heading">Owner Dashboard</h2>;
    }
    return null;
  };

  const renderManagerDashboardHeading = () => {
    if (isLoggedIn && role === "MANAGER") {
      return <h2 className="dashboard-heading">Manager Dashboard</h2>;
    }
    return null;
  };

  const renderReceptionistDashboardHeading = () => {
    if (isLoggedIn && role === "RECEPTIONIST") {
      return <h2 className="dashboard-heading">Receptionist Dashboard</h2>;
    }
    return null;
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  return (
    <div id="Panel">
      <div className="lo">
        <NavLink to="/">
          <img
            src={Logo4}
            alt=""
            style={{ height: "55px", width: "100px", padding: "0px 1px" }}
          />
        </NavLink>
      </div>
      <div className="inner">
        {(isLoggedIn && role === "USER") || !isLoggedIn ? (
          <>
            <NavLink to="/about" className="about">
              About
            </NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </>
        ) : null}

        {(isLoggedIn && role === "USER") || !isLoggedIn ? (
          <button className="Butt blinking-text" onClick={handleBookNow}>
            BOOK NOW
          </button>
        ) : null}

        {renderOwnerDashboardHeading()}
        {renderManagerDashboardHeading()}
        {renderReceptionistDashboardHeading()}
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
              style={{ width: "55px", height: "28px", color: "#565454" }}
            />
            {isLoggedIn && <span className="username" style={{color:"black"}}>{userName}</span>}
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
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <li className="dropdown-item">Login/Signup</li>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;