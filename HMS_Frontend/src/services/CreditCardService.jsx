import axios from "axios"

const VITE_CARD_BASE_REST_API_URL = "http://localhost:8080/credit-card-details";

export const saveCard = async (data,token) => {
    console.log(data)
      return await axios.post(`${VITE_CARD_BASE_REST_API_URL}`,data,{
          headers:{
              'Authorization':`Bearer ${token}`,
          }   
      });
  }