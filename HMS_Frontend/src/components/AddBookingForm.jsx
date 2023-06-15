import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookingById, updateBookingById } from "../services/BookingService";

const AddBookingForm = () => {
  const [booking, setBooking] = useState({
    numChildren: "",
    numAdults: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const navigate = useNavigate();
  const { bookingId } = useParams();

  useEffect(() => {
    if (bookingId !== undefined) {
      fetchBooking();
    }
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getBookingById(bookingId, token);
      const bookingData = response;
      setBooking(bookingData);
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  const saveBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await updateBookingById(bookingId, booking, token);
      navigate("/listBookings");
      alert("Update Successful");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title mb-4">Update Booking</h2>
              <form onSubmit={saveBooking}>
                <div className="mb-3">
                  <label htmlFor="numChildren" className="form-label">
                    Number of Children:
                  </label>
                  <input
                    type="text"
                    name="numChildren"
                    value={booking.numChildren}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numAdults" className="form-label">
                    Number of Adults:
                  </label>
                  <input
                    type="text"
                    name="numAdults"
                    value={booking.numAdults}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkInDate" className="form-label">
                    Check In Date:
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={booking.checkInDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkOutDate" className="form-label">
                    Check Out Date:
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={booking.checkOutDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <Link to="/listBookings" className="btn btn-secondary ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingForm;