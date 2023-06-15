import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/CreditCard.css";
import { saveCard } from "../services/CreditCardService";
import Swal from "sweetalert2";
import Footer from "./Footer";

const CreditCardForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState(
    location.state ? location.state.totalPrice : 0
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCVV] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Card number validation
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumber.match(cardNumberRegex)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Number",
        text: "Card number should contain only numbers.",
      });
      return;
    }

    // Card holder name validation
    const cardHolderNameRegex = /^[A-Za-z\s]+$/;
    if (!cardHolderName.match(cardHolderNameRegex)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Holder Name",
        text: "Card holder name should contain only letters.",
      });
      return;
    }

    // CVV validation
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvv.match(cvvRegex)) {
      Swal.fire({
        icon: "error",
        title: "Invalid CVV",
        text: "CVV should be a 3-digit number.",
      });
      return;
    }

    // Expiration date validation
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // January is month 0
    const selectedYear = parseInt(expirationYear, 10);
    const selectedMonth = parseInt(expirationMonth, 10);
  
    if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Expiration Date",
        text: "Please select a valid expiration date.",
      });
      return;
    }

    const creditCardData = {
      cardNumber,
      cardHolderName,
      expirationMonth,
      expirationYear,
      cvv,
    };

    const token = localStorage.getItem("token");

    try {
      // Send the credit card data to the server
      const response = await saveCard(creditCardData, token);
      console.log(response.data);

      // Reset the form
      setCardNumber("");
      setCardHolderName("");
      setExpirationMonth("");
      setExpirationYear("");
      setCVV("");
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your payment has been successfully processed.",
      }).then(() => {
        // Navigate to homepage after clicking "OK" button
        navigate("/rating");
      });
    } catch (error) {
      console.error("Error saving credit card details:", error);
    }
  };

  const handleCVVChange = (e) => {
    const inputValue = e.target.value;
    const cvvRegex = /^[0-9]{0,3}$/;
    if (inputValue.match(cvvRegex)) {
      setCVV(inputValue);
    }
  };

  return (
    <div>
      <div className="creditbg">
        <div className="credit-con">
          <h3 style={{ color: "Darkgreen" }}>Total Amount: {totalPrice}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 taking">
              <label htmlFor="cardNumberInput" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumberInput"
                placeholder="Enter Your Card Number Here"
                style={{ width: "400px" }}
                value={cardNumber}
                minLength={0}
                maxLength={16}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardHolderNameInput" className="form-label">
                Name on Card
              </label>
              <input
                type="text"
                className="form-control"
                id="cardHolderNameInput"
                placeholder="Enter Your Name on Card"
                style={{ width: "400px" }}
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvvInput" className="form-label">
                Card CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvvInput"
                placeholder="Enter Card CVV"
                style={{ width: "400px" }}
                value={cvv}
                onChange={handleCVVChange}
                required
              />
            </div>
            <div
              className="form-row"
              style={{ margin: "20px 2px", display: "flex" }}
            >
              <div className="form-group col-6">
                <label htmlFor="expirationMonthSelect">Expiration Month</label>
                <select
                  className="form-control"
                  id="expirationMonthSelect"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  required
                  style={{ marginTop: "9px", marginLeft: "13px" }}
                >
                  <option value="">Select Month</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="expirationYearSelect">Expiration Year</label>
                <select
                  className="form-control"
                  id="expirationYearSelect"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  required
                  style={{ marginTop: "9px", marginLeft: "13px" }}
                >
                  <option value="">Select Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                </select>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-success">
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CreditCardForm;
