import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});


instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  function (response) {
   
    return response && response.data ? response.data : response;
  },
  async function (error) {
    
    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;
