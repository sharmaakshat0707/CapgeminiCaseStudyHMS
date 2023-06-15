import axios from "axios"

const VITE_BOOKING_BASE_REST_API_URL = "http://localhost:8080/bookings";

export const postBooking = async () => {
    return await axios.post(`${VITE_BOOKING_BASE_REST_API_URL}/bookingpost`)
}