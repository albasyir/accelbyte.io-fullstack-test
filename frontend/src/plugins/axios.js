import axios from "axios";

const request = axios.create({
  baseURL: process.env.RECIPE_API,
});

export default request;
