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

    if (errorMessage) errorMessage = errorMessage.replaceAll(/path/gi, "field");

    if (error.response.status === 404) {
      errorMessage = "Recipe not found";
    } else {
      errorMessage = "Something went wrong";
    }

    store.commit("setErrors", errorMessage);

    return Promise.reject(error);
  }
);

export default request;
