import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ReceptionistNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div id="Panel">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Receptionist DashBoard
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                <NavLink to="/listGuests" className="Guests">
                  <button type="button" className="btn btn-primary">
                    Guests
                  </button>
                </NavLink>
              </a>
              <a className="nav-link" href="#">
                <NavLink to="/listBookings">
                  <button type="button" className="btn btn-primary">
                    Bookings
                  </button>
                </NavLink>
              </a>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ReceptionistNavbar;
