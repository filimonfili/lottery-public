import axios from "axios";

const api = axios.create({
  baseURL: "https://lottery-backend-ox19.onrender.com/api",
});

export default api;
