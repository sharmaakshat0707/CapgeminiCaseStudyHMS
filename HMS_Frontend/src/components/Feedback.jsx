import React, { useState } from 'react';
import '../css/Feedback.css';
import Swal from "sweetalert2";
import { Navigate, useNavigate } from 'react-router';

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // You can send the rating to an API or perform any other action here
    console.log(rating);
    Swal.fire({
        icon: "success",
        title: "Rating have been successfully submitted!",
        text: "Please Visit Again!",
      }).then(() => {
        // Navigate to homepage after clicking "OK" button
        navigate("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{marginLeft:"20px",marginTop:"80px" ,marginBottom:"70px", color:"darkgreen"}}>How Was Your experience with us!</h2>
      <div className="rating-container">
        <button
          className={`emoji ${rating === 1 ? 'selected' : ''}`}
          type="button"
          onClick={() => handleRating(1)}
        >
          😡
        </button>
        <button
          className={`emoji ${rating === 2 ? 'selected' : ''}`}
          type="button"
          onClick={() => handleRating(2)}
        >
          😐
        </button>
        <button
          className={`emoji ${rating === 3 ? 'selected' : ''}`}
          type="button"
          onClick={() => handleRating(3)}
        >
          🙂
        </button>
        <button
          className={`emoji ${rating === 4 ? 'selected' : ''}`}
          type="button"
          onClick={() => handleRating(4)}
        >
          😃
        </button>
        <button
          className={`emoji ${rating === 5 ? 'selected' : ''}`}
          type="button"
          onClick={() => handleRating(5)}
        >
          😍
        </button>
      </div>
      <button type="submit" disabled={!rating} className='feedback'>
        Submit
      </button>
    </form>
  );
};

export default Feedback;
