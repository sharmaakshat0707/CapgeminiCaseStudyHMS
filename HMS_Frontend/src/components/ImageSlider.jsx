import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/ImageSlider.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvailableRooms } from "../services/RoomService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const ImageSlider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState(location.state?.data);

  const [multiRooms, setMultiRooms] = useState([]);

  const [checked, setChecked] = useState(false);

  const [data, setData] = useState({
    checkInDate: location.state?.checkInDate ? new Date(location.state.checkInDate) : new Date(),
    checkOutDate: location.state?.checkOutDate ? new Date(location.state.checkOutDate) : new Date(),
    numAdults: location.state?.numAdults || "",
    numChildren: location.state?.numChildren || "0",
  });

  const currentFormattedDate = format(new Date(), "yyyy-MM-dd");

  const handleChange = (e) => {
    if (e.target.name === "checkInDate" || e.target.name === "checkOutDate") {
      const dateValue = e.target.value;
      const date = new Date(dateValue);
      setData({ ...data, [e.target.name]: isNaN(date.getTime()) ? dateValue : date });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = data.checkInDate.toISOString().split("T")[0];
    const checkOutDate = data.checkOutDate.toISOString().split("T")[0];
    const numAdults = parseInt(data.numAdults);
    const numChildren = parseInt(data.numChildren);
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
    })
      .then((res) => {
        setRooms(res.data);
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

  useEffect(() => {
    if (
      location.state?.from === "/available" ||
      location.state?.from === "/reservation"
    ) {
    } else {
      navigate("/available");
    }
  }, []);

  const handleBooking = (room) => {
    navigate("/booking-page", {
      state: {
        data: room,
        from: "/image-slider",
        checkInDate: location.state?.checkInDate,
        checkOutDate: location.state?.checkOutDate,
        numAdults: location.state?.numAdults,
        numChildren: location.state?.numChildren,
        roomIds: multiRooms, //For multiple Rooms
      },
    });
    console.log(room);
    console.log(multiRooms);
  };

  const handleRoomSelection = (roomId) => {
    console.log(roomId);
    setMultiRooms([...multiRooms, roomId]);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <ToastContainer />
      <div className="App">
        <div className="imageSliderbox">
          <form onSubmit={handleSubmit}>
            <label style={{ margin: "20px 150px" }}>
              <h6 style={{ color: "#fff" }}>Check-In-Date:</h6>
              <input
                type="date"
                name="checkInDate"
                defaultValue={
                  data.checkInDate instanceof Date
                    ? `${data.checkInDate.getFullYear()}-${(
                        data.checkInDate.getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${data.checkInDate
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`
                    : location.state?.checkInDate || ""
                }
                style={{ width: "150px", height: "40px" }}
                onChange={handleChange}
                min={currentFormattedDate} // Set the min attribute to the current formatted date
                required
              />
            </label>
            <label style={{ marginRight: "140px" }}>
              <h6 style={{ color: "#fff" }}>Check-Out-Date:</h6>
              <input
                type="date"
                name="checkOutDate"
                defaultValue={
                  data.checkOutDate instanceof Date
                    ? `${data.checkOutDate.getFullYear()}-${(
                        data.checkOutDate.getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${data.checkOutDate
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`
                    : location.state?.checkOutDate || ""
                }
                style={{ width: "150px", height: "40px", marginLeft: "5px" }}
                onChange={handleChange}
                min={currentFormattedDate} // Set the min attribute to the current formatted date
                required
              />
            </label>
            <label style={{ marginRight: "90px" }}>
              <h6 style={{ color: "#fff" }}>No of Adults</h6>
              <input
                type="number"
                name="numAdults"
                placeholder="Number of Guests"
                onChange={handleChange}
                defaultValue={data.numAdults}
                min={1}
                max={4}
                style={{ width: "200px", height: "40px" }}
                required
              />
            </label>
            <label>
              <h6 style={{ color: "#fff" }}>Number Of Children(0-12)</h6>
              <input
                type="number"
                name="numChildren"
                placeholder="Number Of Children"
                onChange={handleChange}
                defaultValue={data.numChildren} // Set default value to 0
                min={0}
                max={2}
                style={{ width: "200px", height: "40px" }}
                required
              />
            </label>
            <button
              className="con-button"
              type="submit"
              style={{
                padding: "10px 30px",
                marginLeft: "625px",
                color: "#fff",
                backgroundColor: "rgb(55, 154, 83)",
              }}
            >
              Apply
            </button>
          </form>
        </div>
        <div className="img-con" style={{ marginTop: "60px" }}>
          <h3 className="Img-head">
            <i>If You Are</i> Here WE Are <i className="room">There For You</i>{" "}
          </h3>
          <h3 className="Img-head">
            Book Your <i className="room">Room</i>!
          </h3>
        </div>
        {rooms?.length > 0 ? (
          <Carousel responsive={responsive}>
            {rooms?.map((room, index) => {
               const isCheckoutBeforeCheckin = data.checkOutDate < data.checkInDate;
              return (
                <div
                  className="card"
                  key={index}
                  style={{
                    padding: "10px 21px",
                    border: "1px solid lightGrey",
                    boxShadow: "#fgh",
                  }}
                >
                  <img
                    className="product--image"
                    src={`data:image/png;base64,${room.image}`}
                    alt="room"
                    style={{
                      height: "400px",
                      width: "400px",
                      marginBottom: "15px",
                    }}
                  />
                  <h3>{room.roomType} Room</h3>
                  <p className="price">{room.price}/- per Night</p>
                  <hr />
                  <p style={{ fontSize: "15px" }} className="roomDescription">
                    {room.roomDescription}{" "}
                  </p>
                  <hr />
                  <p>
                    <button
                      className="Img-butt"
                      onClick={() => handleBooking(room)}
                      disabled={isCheckoutBeforeCheckin}
                    >
                      Book Now
                    </button>
                    {/* <input
                      type="checkbox"
                      onChange={() => handleRoomSelection(room.roomId)}
                    /> */}
                  </p>
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </div>
    </div>
  );
};

export default ImageSlider;