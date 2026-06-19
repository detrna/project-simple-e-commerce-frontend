import { apiURL } from "@/@types/Constants";
import axios from "axios";

const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
