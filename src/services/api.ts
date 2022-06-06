import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-teste-front-end-fc.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
