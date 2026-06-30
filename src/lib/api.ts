import { apiURL } from "@/@types/EnvConstants";
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

const authApi = axios.create({
  baseURL: apiURL,
});

authApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
