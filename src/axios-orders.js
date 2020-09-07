import axios from "axios";

const instance = axios.create({
  baseURL: "https://emin-burgerbuilder-react.firebaseio.com",
});

export default instance;
