import React from "react";
import { NavLink } from "react-router-dom";
import '../css/AdminNavbar.css'

const AdminNavbar = () => {
  return (
    <div>
      <div className="admin-panel">
        <div className="admin-logo">
          <h6>Admin Panel</h6>
        </div>
        <div className="admin-content">
          <NavLink to="/about" className="about">
            About
          </NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="admin-icon">
          <h6>Profile</h6>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
