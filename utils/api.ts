import axios from "axios";

const API = axios.create({
  baseURL: "https://felikz97.pythonanywhere.com",
});

export default API;
