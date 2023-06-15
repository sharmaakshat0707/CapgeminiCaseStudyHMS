import React, { useState } from "react";
import "../css/Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveContact } from "../services/ContactService";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const diffToast = () => {
    toast("Successful Sent!");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create an entity class using the form values
    const contactEntity = {
      name,
      email,
      city,
      contact,
      message,
    };

    // Do something with the contactEntity object
    console.log(contactEntity);

    const token  = localStorage.getItem('token');

    try {
      // Send the credit card data to the server
      const response = await saveContact(contactEntity,token);
      console.log(response.data); 

    // Reset the form fields
    setName("");
    setEmail("");
    setCity("");
    setContact("");
    setMessage("");
  } catch (error) {
    console.error('Error sending contact  details:', error);
  }
  diffToast();
};
  

  return (
    <div>
      <div className="Heading">
        <h1 style={{marginLeft:"630px" , marginTop:"55px"}}>Contact Us</h1>
      </div>
      <div className="contact-bg">
        <div className="contact-cont">
          <h2 style={{ color: "rgb(55, 152, 81)" }}>For Reservations/Queries</h2>
          <p>Near Hotel Surendra Vilas,</p>
          <p>Zone-I, MP Nagar,Bhopal</p>
          <p>Tel: +0755 493 2054</p>
          <p>Mob: +91 7849999054</p>
          <p>09:30 am to 06:30 pm, Monday to Saturday.</p>
          <p>
            <b>For Reservation:</b> hotellemontree2@gmail.com
          </p>
          <p>
            <b>For Groups & Events:</b> hotellemontree2@gmail.com
          </p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                style={{ width: "400px" }}
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                style={{ width: "400px" }}
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                style={{ width: "400px" }}
                type="text"
                className="form-control"
                id="city"
                placeholder="Your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                style={{ width: "400px" }}
                type="text"
                className="form-control"
                id="contact"
                placeholder="Your Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                style={{ width: "400px" }}
                className="form-control"
                id="message"
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success" style={{ marginLeft: "12px" }}>
              Send Message
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
