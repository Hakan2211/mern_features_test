import axios from "axios";

export default axios.create({
  // baseURL: "https://fundavoll.herokuapp.com/api",
  baseURL: "http://localhost:5000/api",
});
