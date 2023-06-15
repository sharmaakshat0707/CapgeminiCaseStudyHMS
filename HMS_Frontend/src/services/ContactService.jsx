import axios from "axios"

const VITE_CONTACT_BASE_REST_API_URL = "http://localhost:8080/contact";


export const saveContact = async (data,token) => {
    console.log(data)
      return await axios.post(`${VITE_CONTACT_BASE_REST_API_URL}`,data,{
          headers:{
              'Authorization':`Bearer ${token}`,
          }
          
      });
  }