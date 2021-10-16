import axios from "axios";
import Vue from "vue";

const request = axios.create({
  baseURL: "http://localhost:8000",
});

Vue.prototype.$request = request;

export default request;
