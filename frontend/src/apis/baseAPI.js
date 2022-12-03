import axios from "axios";

export default axios.create({
  baseURL: "https://curious-garters-deer.cyclic.app/api",
  //baseURL: "http://localhost:5000/api",
});
