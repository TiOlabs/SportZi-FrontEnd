import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// Define custom Axios instance with type AxiosInstance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Set your API base URL
  timeout: 5000, // Set timeout if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include JWT token in request headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get JWT token from cookie
    const token = Cookies.get("token"); // Assuming your token is stored with the name 'jwtToken'
    console.log(token);

    // If token exists, set Authorization header with Bearer token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use((res) => {
//   return res;
// },
// (error) => {
//   window.location.href='/login';

// }
// )

export default axiosInstance;
