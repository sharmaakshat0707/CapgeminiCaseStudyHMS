import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { saveGuest } from "../services/GuestService";
import { ToastContainer, toast } from "react-toastify";
import { createBooking } from "../services/BookingService";

const Payment = ({
  room,
  checkInDate,
  checkOutDate,
  bookingRoomIds,
  setBookingRoomIds,
  numAdults,
  numChildren,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(room?.roomId);
    setBookingRoomIds([...bookingRoomIds, room?.roomId]);
  }, []);

  useEffect(() => {
    setData({ ...data, roomIds: bookingRoomIds });
  }, [bookingRoomIds]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    numAdults: location.state?.numAdults,
    numChildren: location.state?.numChildren,
    numNights: location.state?.numNights,
    checkInDate: location.state?.checkInDate,
    checkOutDate: location.state?.checkOutDate,
  });

  useEffect(() => {
    if (location.state?.from !== "/image-slider") {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ... existing code ...

const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Email validation check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    toast.error("Invalid email address. Please enter a valid email.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  const guestData = {
    name: data.firstName + " " + data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
  };

  // Validation 
  if (
    isNaN(data.firstName) &&
    isNaN(data.lastName) &&
    !isNaN(data.phone) &&
    data.phone !== "abc"
  ) {
    saveGuest(guestData, localStorage.getItem("token"))
      .then((response) => {
        console.log(response.data, "response");
        createBooking({ ...data, guestIds: [response.data.id] }, localStorage.getItem("token"))
          .then((res) => {
            toast.success("Booking Successful", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
            console.log(res);
            navigate("/billingpage", {
              state: {
                from: "/payment",
                data: res,
              },
            });
          })
          .catch((err) => {
            toast.error("Something went wrong, Please try again!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    toast.error("Invalid input. Please check your entries.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
  }
};

  return (
    <div>
      <div className="payment-panel" style={{marginTop:"110px" , height:"650px"}}>
        <div className="container" style={{ padding: "10px 400px" }}>
          <ToastContainer />
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: "Lightgrey", fontSize: "30px" }}
            >
              Personal Information
            </div>
            <form className="card-body Dark" onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col">
                  <div className="input-group" style={{ width: "500px" }}>
                    <span className="input-group-text">First name</span>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="input-group" style={{ width: "500px" }}>
                    <span className="input-group-text">Last name</span>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="input-group" style={{ width: "500px" }}>
                    <span className="input-group-text">Address</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="input-group" style={{ width: "500px" }}>
                    <span className="input-group-text">Contact</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      minLength={10}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="input-group" style={{ width: "500px" }}>
                    <span className="input-group-text">Email</span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                style={{marginTop:"10px" ,marginBottom: "50px" , marginLeft:"0px", padding:"10px 30px"}}
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
