import axios from "axios";

export default axios.create({
  baseURL: "https://fundavoll.herokuapp.com/api",
});
