import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Registration.css";
import Footer from "./Footer";

const Registration = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation check for first name
    const firstNameRegex = /^[A-Za-z\s]+$/;
    if (!data.firstName.match(firstNameRegex)) {
      toast.error("Invalid first name. Please enter only letters.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Validation check for last name
    const lastNameRegex = /^[A-Za-z\s]+$/;
    if (!data.lastName.match(lastNameRegex)) {
      toast.error("Invalid last name. Please enter only letters.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Validation check for username
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
    if (!data.username.match(usernameRegex)) {
      toast.error(
        "Invalid username. Please start with a letter and only use letters and numbers.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }

    // Validation check for city
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!data.city.match(cityRegex)) {
      toast.error("Invalid city name. Please enter only letters.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Validation check for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.match(emailRegex)) {
      toast.error("Invalid email. Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    register(data)
      .then((res) => {
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("User with this username already exists!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleSignUpClick = () => {
    navigate("/login"); // Navigate to the register component
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg">
        <div className="firstOne">
          <div className="content">
            <h1>Create an Account</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  First Name
                </span>
                <input
                  style={{ color: "Black" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Last Name
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  UserName
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  City
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City Name"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Email
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  aria-label="password"
                  value={data.password}
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <button type="submit" className="registerButton">
                Register
              </button>
              <br />
              <br />
            </form>
          </div>
        </div>
        <div className="secondtwo">
          <div className="conn">
            <h2>Already have an account?</h2>
            <br />
            <p>Login and explore the platform!</p>
            <br />
            <button onClick={handleSignUpClick} className="mb-3">
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Registration;
