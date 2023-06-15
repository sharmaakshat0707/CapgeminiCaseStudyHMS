import React, { useEffect, useState } from "react";
import "../css/Bills.css";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";


const Bills = () => {
  // const [amount, setamount] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (amount === "") {
  //     alert("please enter amount");
  //   } else {
  //     var options = {
  //       key: "rzp_test_WWI5clIuf3w5Z7",
  //       key_secret: "mVBXPfdLLwia6sVfQJMm79zy",
  //       amount: amount * 100,
  //       currency: "INR",
  //       name: "Lemon-Tree",
  //       description: "For testing payment",
  //       handler: function (response) {
  //         alert(response.razorpay_payment_id);
  //       },
  //       prefill: {
  //         name: "john",
  //         email: "john123@gmail.com",
  //         contact: "7890654321",
  //       },
  //       notes: {
  //         address: "Razorpay Corporation Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     var pay = new window.Razorpay(options);
  //     pay.open();
  //   }
  // };

  const location = useLocation();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const { checkInDate, checkOutDate, numAdult, numChildren } =
    location.state?.data;

    const { name } = location.state?.data.guest[0];
    const { roomType } = location.state?.data.rooms[0];
  

  const calculateNumNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return numNights;
    }
    return 0;
  };

  useEffect(() => {
    if (
      location.state?.from !== "/payment" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/login");
    } else {
      const { rooms, data } = location.state?.data;

      const price = rooms.reduce((total, room) => total + room.price, 0);
      const numNights = calculateNumNights();
      const roomType = location.state?.roomType;
      const numAdult = location.state?.numAdults;
      const numChildren = location.state?.numChildren;
      const totalPrice = price * numNights;

      const checkInMonth = new Date(checkInDate).getMonth();
      const checkOutMonth = new Date(checkOutDate).getMonth();
      const isBetweenJuneAndJuly =
        checkInMonth >= 5 && checkOutMonth <= 6; // Months are zero-based, so June is 5 and July is 6
      const discountPercentage = isBetweenJuneAndJuly ? 0.2 : 0; // 20% discount if between June and July, 0% otherwise
      const discountedPrice = totalPrice - totalPrice * discountPercentage;

      setTotalPrice(discountedPrice);
      if (discountedPrice > 0 && discountPercentage > 0) {
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You got a 20% discount for the summer sale!",
          footer: `Discounted amount: ${totalPrice.toFixed(0)} - ${totalPrice * discountPercentage.toFixed(
            2
          )} = ${discountedPrice.toFixed(0)}`,
        });
      }
    }
  }, []);


  

  const handlePaymentButtonClick = () => {
    navigate("/creditcard", { state: { totalPrice } });
  };

  return (
    <div>
      <div className="bill-card">
        <div
          className="card-header"
          style={{ color: "white", letterSpacing: "1px" }}
        >
          <h1 style={{ fontSize: "25px" }}>LEMON TREE HOTEL , BHOPAL</h1>
        </div>
        <div className="card-header" style={{ color: "white" }}>
          <h3 style={{ marginLeft: "140px", fontSize: "20px" }}>
            Invoice & Bills
          </h3>
        </div>
        <div className="BillDetails">
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              style={{ backgroundColor: "rgb(224, 224, 224)" }}
            >
              Billing Number : {location.state?.data.bookingId}
              <br />
              <br />
              Room Type: {roomType}
              <br />
              <br />
              Name of Guest :{name}
            </li>
          </ul>
        </div>
        <ul
          className="list-group list-group-flush"
          style={{ backgroundColor: "rgb(224, 224, 224)" }}
        >
          <li
            className="list-group-item"
            style={{ backgroundColor: "rgb(238, 238, 238)" }}
          >
            Check-In-Date : {checkInDate} <br /> <br /> Check-Out-Date :{" "}
            {checkOutDate}
          </li>
          <li
            className="list-group-item"
            style={{ backgroundColor: "rgb(224, 224, 224)" }}
          >
            No Of Adult {location.state?.data.numAdults} :: No Of Children{" "}
            {location.state?.data.numChildren}
            <br />
            <br />
            Total Night = {calculateNumNights()} <br />
            <br />
            Amount To Be Paid is Rs = {totalPrice}/- <br />
            <br />
          </li>
          <li
            className="list-group-item"
            style={{ backgroundColor: "rgb(224, 224, 224)" }}
          >
            <button
              type="button"
              className="btnsuccess"
              onClick={handlePaymentButtonClick}
            >
              Pay Here
            </button>
            {/* <input   ///input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>
              Go to Payment
            </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bills;