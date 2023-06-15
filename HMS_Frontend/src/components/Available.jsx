import React, { useState } from "react";
import "../css/Available.css";
import { getAvailableRooms } from "../services/RoomService";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Available = () => {
  const navigate = useNavigate();
  const presentDate = new Date().toISOString().split('T')[0];

  const [data, setData] = useState({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    numAdults: "1", 
    numChildren: "0",
    numNights: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "checkInDate" || e.target.name === "checkOutDate") {
      setData({ ...data, [e.target.name]: new Date(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const calculateNumNights = () => {
    if (data.checkInDate && data.checkOutDate) {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate number of nights
      return numNights.toString(); // Convert to a string before returning
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = data.checkInDate.toISOString().split("T")[0];
    const checkOutDate = data.checkOutDate.toISOString().split("T")[0];
    const numAdults = parseInt(data.numAdults);
    const numChildren = parseInt(data.numChildren);
    const numNights = calculateNumNights();
    // const numRooms = parseInt();
    setData({ ...data, numNights });
    console.log(data.checkInDate.toISOString());
    console.log(data);

    if (checkOutDate < checkInDate) {
      toast.error("CHECK-OUT DATE SHOULD BE AFTER CHECK-IN DATE");
      return;
    }

    if (numAdults <= 0) {
      toast.error("numAdults should be greater than 0");
      return;
    }

    getAvailableRooms({
      checkInDate: data.checkInDate.toISOString().split("T")[0],
      checkOutDate: data.checkOutDate.toISOString().split("T")[0],
      numAdults: parseInt(data.numAdults),
      numChildren: parseInt(data.numChildren),
      numNights: numNights,
    })
      .then((res) => {
        console.log(res.data);
        navigate("/image-slider", {
          state: {
            from: "/available",
            data: res.data,
            checkInDate: data.checkInDate.toISOString().split("T")[0],
            checkOutDate: data.checkOutDate.toISOString().split("T")[0],
            numAdults: parseInt(data.numAdults),
            numChildren: parseInt(data.numChildren),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="available">
      <div className="available-box">
        <h2>Enjoy Your Holiday</h2>
        <span style={{marginLeft:"-21px" , color:"lightGrey" , wordSpacing:"3px"}}>Select & Book Your Room</span>
        <form onSubmit={handleSubmit}>
          <div className="flex_space">
          <label style={{color:"white" , fontSize:"20px"  , marginRight:"117px"}}>Check In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={
                data.checkInDate.getFullYear().toString() +
                "-" +
                (data.checkInDate.getMonth() + 1).toString().padStart(2, 0) +
                "-" +
                data.checkInDate.getDate().toString().padStart(2, 0)
              }
              onChange={handleChange}
              placeholder="Check In"
              style={{ width: "45.9%" , height:"50px"}}
              min={presentDate} // Set the min attribute to the presentDate
              required
            />
            <label style={{color:"white" , fontSize:"20px"  , marginRight:"108px"}}>Check out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={
                data.checkOutDate.getFullYear().toString() +
                "-" +
                (data.checkOutDate.getMonth() + 1).toString().padStart(2, 0) +
                "-" +
                data.checkOutDate.getDate().toString().padStart(2, 0)
              }
              onChange={handleChange}
              placeholder="Check Out"
              style={{ width: "45.9%" , height:"50px"}}
              min={presentDate} // Set the min attribute to the presentDate
              required
            />
          </div>
          <div className="flex_space">
            <label style={{color:"white" , fontSize:"20px"  ,  marginRight:"80px"}}>Number Of Adults</label>
            <input
              type="number"
              name="numAdults"
              placeholder="Adult(s)"
              onChange={handleChange}
              value={data.numAdults}
              min={1}
              max={4}
              style={{ width: "45.9%" , height:"50px"}}
              required
            />
            <label style={{color:"white" , fontSize:"20px" ,  marginRight:"60px"}}>Number Of Children</label>
            <input
              type="number" // Change input type to 'text' to display the calculated numNights
              name="numChildren"
              placeholder="Children(s)(0-12)"
              onChange={handleChange}
              value={data.numChildren}
              style={{ width: "45.9%", height:"50px" }}
              min={0}
              max={2}
              required
            />
          </div>
          <label style={{color:"white", fontSize:"20px" , marginRight:"78px"}}>Number Of Nights</label>
          <input
            type="text" // Change input type to 'text' to display the calculated numNights
            name="numNights"
            placeholder="Number Of Nights"
            value={calculateNumNights()} // Use calculateNumNights() to display the calculated value
            readOnly // Make the input read-only
            style={{ width: "45.9%", height:"50px", backgroundColor:"lightGrey" }}
            required
          />
          <br />
          <input type="Submit" value="SEARCH" className="submit" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Available;
