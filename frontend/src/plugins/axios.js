import axios from "axios";
import store from "./vuex";

const request = axios.create({
  baseURL: process.env.RECIPE_API,
});

request.interceptors.response.use(
  (result) => {
    return result;
  },
  (error) => {
    let errorMessage = error.response.data.message;

    errorMessage = errorMessage.replaceAll(/path/gi, "field");

    store.commit("setErrors", errorMessage);

    return Promise.reject(error);
  }
);

export default request;
