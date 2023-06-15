import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/UserService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Footer from '../components/Footer'

const Login = ({ setIsLoggedIn , setUserName}) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate(data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
          timer: 3000,
          showConfirmButton: false,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userName", data.username);
        setIsLoggedIn(true);
        if (res.data.role === "USER") {
          navigate("/", {
            state: {
              from: "/login",
              user: "USER",
            },
          });
        } else if (res.data.role === "RECEPTIONIST") {
          navigate("/receptionist/dashboard", {
            state: {
              from: "/login",
              user: "RECEPTIONIST",
            },
          });
        } else if (res.data.role === "OWNER") {
          navigate("/owner/dashboard", {
            state: {
              from: "/login",
              user: "OWNER",
            },
          });
        } else if (res.data.role === "MANAGER") {
          navigate("/manager/dashboard", {
            state: {
              from: "/login",
              user: "MANAGER",
            },
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please enter correct credentials!",
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  const handleSignUpClick = () => {
    navigate("/registration"); // Navigate to the register component
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <div className="bg">
        <div className="firstOne">
          <div className="content">
            <h1 className="login-head">Login In to Your Account</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
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
              <br />
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  PassWord
                </span>
                <input
                  type="Password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <br />
              <button type="submit" className="loginbutton">
                Login
              </button>
              <br />
              <br />
              {/* <label>
                <input type="checkbox" name="remember" /> Remember me
              </label> */}
            </form>
          </div>
        </div>
        <div className="secondtwo">
        <div className="conn">
          <h2>New Here?</h2>
          <br />
          <p>Sign up and discover a great amount of new opportunities!</p>
          <br />
          <button onClick={handleSignUpClick}>Sign Up</button>{" "}
          {/* Use onClick event for the sign-up button */}
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;