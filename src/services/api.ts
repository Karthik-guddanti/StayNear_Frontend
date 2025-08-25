import axios from "axios";
export const api = axios.create({ baseURL: "http://localhost:5000/api" });
export const fetchHostels = () => api.get("/hostels");
export const sendContact = (payload: { name: string; email: string; message: string }) =>
  api.post("/contact", payload);
